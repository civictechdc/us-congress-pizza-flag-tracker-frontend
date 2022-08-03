import React from "react";

const RevertStatusButtonOff = (props) => {
  const { revertUpdateFunc } = props;

  const handleInput = () => {
    revertUpdateFunc();
  };

  return (
    <>
      <button
        onClick={handleInput}
        className="btn btn-success statusButton"
        data-button-function="Revert Disabled"
        disabled
      >
        {"Revert Update"}
      </button>
    </>
  );
};

export default RevertStatusButtonOff;
