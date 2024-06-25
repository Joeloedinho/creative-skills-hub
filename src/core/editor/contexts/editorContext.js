import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuthContext } from '../../auth/contexts/authContext';
import { AlertPopper } from '../../../shared';

// Create the StudentContext
const EditorContext = createContext();

const useEditor = () => useContext(EditorContext);

// Create the StudentProvider component
const EditorProvider = ({ children }) => {
  const [editor, setEditor] = useState(null);
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
        // TODO: Fetch editor data
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
        <EditorContext.Provider value={{ editor, isFetching, error }}>
      {children}
    </EditorContext.Provider>
    <AlertPopper showAlert={response.show} handleClose={() => setResponse({...response, show: false, message: ''})} alertType={response.type}>{response.message}</AlertPopper>
    </>
  );
};

export { useEditor, EditorProvider };
