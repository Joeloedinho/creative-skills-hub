import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../../hooks'
import { replace } from 'formik';

const AuthContext = createContext();

const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const alert = useAlert()
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          const { token, userType, expirationTime } = parsedUserData;
          const currentTime = new Date().getTime();
          if (currentTime < new Date(expirationTime).getTime()) {
            setUserData({ token, userType });
          } else {
            localStorage.removeItem("userData");
          }
        }
      } catch (error) {
        setError(error)
        alert.show({message: 'An error occured', type: 'error', duration: 2000})
      } finally {
        setLoading(() => false);
      }
    };

    fetchUserData();
  }, []);

  const login = async (values, setSubmitting) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/login", values);
      const { token, userType } = response.data;
      setUserData({token, userType});
      const expirationTime = new Date(
        new Date().getTime() + 30 * 24 * 60 * 60 * 1000
      ).toISOString();
      localStorage.setItem(
        "userData",
        JSON.stringify({ token, userType, expirationTime })
      );
      navigate(`/${userType}`, replace);
    } catch (error) {
      const message = 'Login Failed ' + error.response?.data?.message || "An error occurred";
      alert.show({message: message, type: 'error', duration: 5000})
      setError(error)
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  const register = async (values, userType) => {
    setLoading(true);
    try {
      await axios.post(`http://localhost:4000/${userType}s/register_${userType}`, values, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      navigate("/auth/verify-email", { state: { email: values.email, userType: userType } });
    } catch (error) {
      const message = 'Registration Failed ' + error.response?.data?.message || "An error occurred";
      alert.show({message: message, type: 'error', duration: 5000})
      setError(error)
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setLoading(() => true)
    setUserData(null);
    localStorage.removeItem("userData");
    setError(null)
    setLoading(() => false)
  };

  const verifyEmail = async (userType, userEmail, verificationCode) => {
    console.log('Info', userType, userEmail, verificationCode)
    if (verificationCode.trim() === "") {
      alert.show({type: "error", message: "Please enter the verification code.", duration: 2000});
      return;
    }

    setLoading(true);
    const verifyUrl = `http://localhost:4000/${userType}s/verify_email`;
    console.log("Sending verification request to:", verifyUrl);

    try {
      setLoading(true)
      const response = await axios.post(verifyUrl, {
        email: userEmail,
        verificationCode,
      });

      if (response.data.message === 'Email verified and user registered successfully.') {
        console.log('passed')
        alert.show({message: 'Email verified and user registered successfully.', type: 'success', duration: 5000})
        setError(null)
        navigate(`/auth/login`, { replace: true });
      } else {
        throw new Error('Verification Failed. Please try again.');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Network error. Please try again.';
      alert.show({message: message, type: 'error', duration: 5000})
      setError(error)
      console.error('Verification error:', message);
    } finally {
      setLoading(false);
    }
  };

  const verifyEmailCode = async (email, verificationCode, whenDone) => {
    console.log('Info', email, verificationCode, whenDone)
    if (verificationCode === '' || !verificationCode) {
      alert.show({message: 'Please enter verification code', type: 'error', duration: 3000})
      return;
    }
    const url = `http://localhost:4000/auth/verify_reset_code?email=${email}&verificationCode=${verificationCode}`;
    try {
      setLoading(true)
      const { data } = await axios.get(url);
      localStorage.setItem('resetToken', data.token);
      whenDone();
    } catch (error) {
      console.error('Verification failed:', error.response.data.message);
      alert.show({message: 'Verification failed, please try again', type: 'error', duration: 2000})
    } finally {
      setLoading(false)
    }
  };


  const getEmail = ({email, setSubmitting, whenDone}) => {
    setLoading(true)
    fetch(`http://localhost:4000/auth/request_reset?email=${email}`)
      .then(() => whenDone())
      .catch(error => alert.show({
        type: 'error',
        duration: 3000,
        message: 'Error: ' + error.message,
      }))
      .finally(() => {
        setLoading(false)
        setSubmitting(false)
      })
  }


  const resetPassword = async ({token, newPassword, setSubmitting}) => {
    setLoading(true)
    localStorage.setItem('resetToken', token);
    const url = `http://localhost:4000/auth/reset?newPassword=${newPassword}`;
    try {
      await axios.get(url);
      localStorage.removeItem('resetToken');
      alert.show({
        type: 'success',
        duration: 2000,
        message: 'password reset successful',
      })
      setTimeout(() => {
        navigate('/auth/login');
      }, 2000)
    } catch (error) {
      console.error('Error resetting password:', error.response.data.message);
      alert.show({
        type: 'error',
        duration: 2000,
        message: 'Error resetting password: ' + error.response.data.message,
      })
    } finally {
      setSubmitting(false)
      setLoading(false)
    }
  }

  // We provide the functions and variables to the children components
  return (
     <AuthContext.Provider value={{ userData, login, register, logout, verifyEmail, loading, error, verifyEmailCode, getEmail, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuthContext };