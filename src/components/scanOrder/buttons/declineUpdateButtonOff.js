import React from "react";

const DeclineUpdateButtonOff = (props) => {
  const { declineUpdateFunc } = props;

  const handleInput = () => {
    declineUpdateFunc();
  };

  return (
    <>
      <button onClick={handleInput} className="btn btn-success" disabled>
        {"Decline Update TEST"}
      </button>
    </>
  );
};

export default DeclineUpdateButtonOff;
