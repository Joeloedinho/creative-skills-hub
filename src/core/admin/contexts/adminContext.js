import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "../../auth/contexts/authContext";
import { AlertPopper } from "../../../shared";

const AdminContext = createContext();

const useAdmin = () => useContext(AdminContext);

const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const { userData } = useAuthContext();
  const [error, setError] = useState(null);
  const [response, setResponse] = useState({
    show: false,
    type: "success",
    message: "",
  });

  // TODO: @haggai, check this
  const authToken = userData?.koken;
  useEffect(() => {
    const fetchData = async () => {};

    fetchData();
  }, [authToken]);

  return (
    <>
      <AdminContext.Provider value={{ admin, isFetching, error }}>
        {children}
      </AdminContext.Provider>
      <AlertPopper
        showAlert={response.show}
        handleClose={() =>
          setResponse({ ...response, show: false, message: "" })
        }
        alertType={response.type}
      >
        {response.message}
      </AlertPopper>
    </>
  );
};

export { useAdmin, AdminProvider };
