import React from "react";

const RevertStatusButtonOff = (props) => {
  const { revertUpdateFunc } = props;

  const revertUpdate = () => {
    revertUpdateFunc();
  };

  return (
    <>
      <button onClick={revertUpdate} className="btn btn-success" disabled>
        {"Revert Update TEST"}
      </button>
    </>
  );
};

export default RevertStatusButtonOff;
