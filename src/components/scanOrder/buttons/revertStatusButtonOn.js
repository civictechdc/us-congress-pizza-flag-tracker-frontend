import React from "react";

const RevertStatusButtonOn = (props) => {
  const { revertUpdateFunc } = props;

  const handleInput = () => {
    revertUpdateFunc();
  };

  return (
    <>
      <button
        onClick={handleInput}
        className="btn btn-success statusButton"
        data-button-function="Revert Enabled"
      >
        <strong>{"REVERT UPDATE"}</strong>
      </button>
    </>
  );
};

export default RevertStatusButtonOn;
