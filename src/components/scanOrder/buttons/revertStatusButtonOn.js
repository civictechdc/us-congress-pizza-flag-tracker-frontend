import React from "react";

const RevertStatusButtonOn = (props) => {
  const { revertUpdateFunc } = props;

  const revertUpdate = () => {
    revertUpdateFunc();
  };

  return (
    <>
      <button onClick={revertUpdate} className="btn btn-success">
        {"Revert Update TEST"}
      </button>
    </>
  );
};

export default RevertStatusButtonOn;
