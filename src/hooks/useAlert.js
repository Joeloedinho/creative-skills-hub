import { createContext, useContext, useState } from "react";
import { AlertPopper } from '../shared'

const AlertContext = createContext()
const useAlert = () => useContext(AlertContext)

const AlertProvider = ({children}) => {
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage ] = useState('');
    const [alertType, setAlertType] = useState('success');

    const resetAlert = () => {
        setShowAlert(false)
        setAlertMessage('');
    }

    const show = ({ message = '', duration = 1000, type = 'success' }) => {
        setAlertType(type);
        setAlertMessage(message);
        setShowAlert(true)
        setTimeout(() => {
            resetAlert()
        }, duration)
    }

    // todo: fix closing alert
    return (
        <>
            <AlertContext.Provider value={{ show }}>
            {children}
            </AlertContext.Provider>
            <AlertPopper showAlert={showAlert} handleClose={() => resetAlert()} alertType={alertType}>{alertMessage}</AlertPopper>
        </>
    )
}

export { useAlert, AlertProvider }