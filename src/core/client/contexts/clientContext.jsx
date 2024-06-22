import React, {createContext, useContext, useState} from 'react';
import {AlertPopper} from "../../../shared";

const ClientContext = createContext();

const useClient = useContext(ClientContext);

const ClientProvider = ({children}) => {
    const [client, setClient] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null)
    const [response, setResponse] = useState({
        show: false,
        type: "success",
        message: "",
    })
    return (
        <div>
            <ClientContext.Provider value={{client, isFetching, error }} >
                {children}
            </ClientContext.Provider>
            <AlertPopper showAlert={response.show} handleClose={() => setResponse({...response, show: false, message: ""})} alertType={response.type}>{response.message}</AlertPopper>
        </div>
    );
};

export { ClientProvider, useClient };