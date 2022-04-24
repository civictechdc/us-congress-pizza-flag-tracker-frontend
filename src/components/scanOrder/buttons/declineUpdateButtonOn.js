import React from "react";

const DeclineUpdateButtonOn = (props) => {
  const { declineUpdateFunc } = props;

  const handleInput = () => {
    declineUpdateFunc();
  };

  return (
    <>
      <button
        onClick={handleInput}
        className="btn btn-success"
        data-button-function="Decline Enabled"
      >
        {"Decline Update"}
      </button>
    </>
  );
};

export default DeclineUpdateButtonOn;
