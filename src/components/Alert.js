import React, { useContext } from 'react'
import AlertContext from '../context/alert/AlertContext'

export default function Alert() {
  const {alert} = useContext(AlertContext);

  if(alert != null && alert.hasOwnProperty('type')){
      return (
          <div>
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                  <strong>{alert.type}</strong> {alert.msg}
                  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
          </div>
      )
  }
  else{
      return(
          <div></div>
      )
  }
}
