import React, { createContext, useState, useEffect } from 'react';

// Create the StudentContext
const StudentContext = createContext();

// Create the StudentProvider component
const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const response = await fetch('http://localhost:4000/students/profile', {
          method: 'GET',
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Student date', data)
        setStudent(data);
      } catch (error) {
        setError(error.message);
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
    <StudentContext.Provider value={{ student, isFetching, error }}>
      {children}
    </StudentContext.Provider>
  );
};

export { StudentContext, StudentProvider };
