import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlertPopper } from '../../../shared';
import { replace } from 'formik';

// Create the UserContext
const AuthContext = createContext();

// Create a custom hook to use the UserContext
const useAuthContext = () => useContext(AuthContext);

// The UserProvider component wraps the application and provides the user data
// and functions to interact with the authentication API to all the components
// that need it, using the React Context API
const AuthProvider = ({ children }) => {
  // The user data is stored in the localStorage, so we can retrieve it when
  // the app starts
  const [userData, setUserData] = useState(null);
  // The loading state is used to display a loading indicator while the login
  // or registration is happening
  const [loading, setLoading] = useState(false);
  // The authResponse state is used to display a message to the user after the
  // login, registration or logout
  const [authResponse, setAuthResponse] = useState({
    // show is true if the message should be displayed
    show: false,
    // type is the message type (success, error, etc.)
    type: "success",
    // message is the message to be displayed
    message: "",
  });
  // The error state is used to store any error that might occur during the
  // login, registration or logout
  const [error, setError] = useState(null);
  // The navigate function is used to redirect the user when needed
  const navigate = useNavigate();

  useEffect(() => {
    // When the component mounts we try to retrieve the user data from the
    // localStorage
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // We retrieve the user data from the localStorage
        const storedUserData = localStorage.getItem("userData");
        // If there is a user data we parse it and check if it's still valid
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          const { token, userType, expirationTime } = parsedUserData;
          const currentTime = new Date().getTime();
          // If the token is still valid we set the user data and token
          if (currentTime < new Date(expirationTime).getTime()) {
            setUserData({ token, userType });
          } else {
            // If the token is not valid anymore we remove the user data
            localStorage.removeItem("userData");
          }
        }
      } catch (error) {
        // If there is an error we display an error message
        setAuthResponse({
          show: true,
          type: "error",
          message: "An error occurred",
        });
      } finally {
        // We always set the loading state to false when the effect finishes
        setLoading(() => false);
      }
    };

    fetchUserData();
  }, []);

  // The login function is used to login the user with the login API
  const login = async (values, setSubmitting) => {
    setLoading(true);
    try {
      // We send the login request to the API
      const response = await axios.post("http://localhost:4000/login", values);
      const { token, userType } = response.data;
      // We set the token and user data
      setUserData({token, userType});
      // We store the user data in the localStorage for future logins
      const expirationTime = new Date(
        new Date().getTime() + 30 * 24 * 60 * 60 * 1000
      ).toISOString();
      localStorage.setItem(
        "userData",
        JSON.stringify({ token, userType, expirationTime })
      );
      // We redirect the user to the user's home page
      navigate(`/${userType}`, replace); // Adjust to match your routing setup
    } catch (error) {
      // If there is an error we display an error message
      console.error(
        "Login failed:",
        error.response?.data?.message || "An error occurred"
      );
      setAuthResponse({
        show: true,
        type: "error",
        message: "An error occurred",
      });
    } finally {
      // We always set the submitting state to false when the login finishes
      setSubmitting(false);
      setLoading(false);
    }
  };

  // The register function is used to register the user with the registration API
  const register = async (values, userType) => {
    setLoading(true);
    try {
      // We send the registration request to the API
      await axios.post(`http://localhost:4000/${userType}s/register_${userType}`, values, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // We redirect the user to the verify email page
      navigate("/auth/verify-email", { state: { email: values.email, userType: userType } });
    } catch (error) {
      // If there is an error we display an error message
      console.error("Registration failed:", error);
      setAuthResponse({
        show: true,
        type: "error",
        message: "Registration failed. Please try again.",
      });
    } finally {
      // We always set the loading state to false when the registration finishes
      setLoading(false);
    }
  };

  // The logout function is used to logout the user
  const logout = () => {
    // We remove the user data from the localStorage
    setUserData(null);
    localStorage.removeItem("userData");
  };

  // The verifyEmail function is used to verify the user's email with the verify
  // email API
  const verifyEmail = async (userType, userEmail, verificationCode) => {
    if (verificationCode.trim() === "") {
      setAuthResponse({
        show: true,
        type: "error",
        message: "Please enter the verification code.",
      });
      return;
    }

    setLoading(true);
    const verifyUrl = `http://localhost:4000/${userType}s/verify_email`;
    console.log("Sending verification request to:", verifyUrl);

    try {
      const response = await axios.post(verifyUrl, {
        email: userEmail,
        verificationCode,
      });

      if (response.data.message === 'Email verified and user registered successfully.') {
        setAuthResponse({
          show: true,
          type: "success",
          message: "Email verified and user registered successfully. Please continue to login",
        });
        navigate(`/auth/login`, { replace: true });
      } else {
        throw new Error('Verification Failed. Please try again.');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Network error. Please try again.';
      setAuthResponse({
        show: true,
        type: 'error',
        message,
      });
      console.error('Verification error:', message);
    } finally {
      setLoading(false);
    }
  };

  // We provide the functions and variables to the children components
  return (
   <>
     <AuthContext.Provider value={{ userData, login, register, logout, verifyEmail, loading, error }}>
      {children}
    </AuthContext.Provider>
    <AlertPopper showAlert={authResponse.show} handleClose={() => setAuthResponse({...authResponse, show: false})} alertType={authResponse.type}>{authResponse.message}</AlertPopper>
   </>
  );
};

// Export the UserProvider and useUserContext
export { AuthProvider, useAuthContext };