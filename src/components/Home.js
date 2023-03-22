import React from "react";
import Notes from "./Notes";


const Home = (props) => {

  return (
    <>
      <div className="container">
        <Notes displayAlert={props.displayAlert} />
      </div>
    </>
  );
};

export default Home;