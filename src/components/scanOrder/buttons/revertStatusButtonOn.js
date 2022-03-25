import React from "react";

const RevertStatusButtonOn = (props) => {
  const { revertUpdateFunc } = props;

  const handleInput = () => {
    revertUpdateFunc();
  };

  return (
    <>
      <button onClick={handleInput} className="btn btn-success">
        {"Revert Update"}
      </button>
    </>
  );
};

export default RevertStatusButtonOn;
