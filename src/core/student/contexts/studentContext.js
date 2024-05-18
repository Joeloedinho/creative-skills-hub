import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuthContext } from '../../auth/contexts/authContext';
import { AlertPopper } from '../../../shared';

// Create the StudentContext
const StudentContext = createContext();

const useStudent = () => useContext(StudentContext);

// Create the StudentProvider component
const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const { userData } = useAuthContext();
  const [ error, setError] = useState(null);
  const [response, setResponse] = useState({
    show: false,
    type: "success",
    message: ""
  });

  const authToken = userData?.token
  console.log('Authtoken', userData?.token)
  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try{
        const response = await fetch('http://localhost:4000/students/profile', {
          method: 'GET',
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (!data) {
          throw new Error('Got null data from server');
        }
        console.log('Student date', data)
        setStudent(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setError(error)
        setResponse({
          show: true,
          type: "error",
          message: error,
        });
      } finally {
        setIsFetching(false);
      }
    };


    if (authToken) {
      console.log('Auth token', authToken)
      fetchData();
    }
  }, [authToken]); 
  // Function to update a student's data
  // Provide the student data and functions to the children components
  return (
    <>
        <StudentContext.Provider value={{ student, isFetching, error }}>
      {children}
    </StudentContext.Provider>
    <AlertPopper showAlert={response.show} handleClose={() => setResponse({...response, show: false, message: ''})} alertType={response.type}>{response.message}</AlertPopper>
    </>
  );
};

export { useStudent, StudentProvider };
