import React from "react";

const RevertStatusButtonOn = (props) => {
  const { revertUpdateFunc } = props;

  const handleInput = () => {
    revertUpdateFunc();
  };

  return (
    <>
      <button onClick={handleInput} className="btn btn-success">
        <strong>{"REVERT UPDATE"}</strong>
      </button>
    </>
  );
};

export default RevertStatusButtonOn;
