import React from "react";

const Alert = (props) => {
  return (
    <>
      <div className="alert alert-primary text-center" role="alert">{props.message}</div>
    </>
  );
};

export default Alert;
