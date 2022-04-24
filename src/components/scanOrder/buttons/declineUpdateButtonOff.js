import React from "react";

const DeclineUpdateButtonOff = (props) => {
  const { declineUpdateFunc } = props;

  const handleInput = () => {
    declineUpdateFunc();
  };

  return (
    <>
      <button
        onClick={handleInput}
        className="btn btn-success"
        data-button-function="Decline Disabled"
        disabled
      >
        {"Decline Update"}
      </button>
    </>
  );
};

export default DeclineUpdateButtonOff;
