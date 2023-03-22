import { useState } from 'react'
import AlertContext from './AlertContext'


export const AlertState = (props) => {
    const [alert, setAlert] = useState(null);
    function displayAlert(message, type){
        setAlert({
        msg: message,
        type: type
        });
        
        setTimeout(()=>{setAlert(null)}, 2000);
    }
    return (
        <AlertContext.Provider value={{ alert, setAlert, displayAlert }}>
            {props.children}
        </AlertContext.Provider>
    );
}
