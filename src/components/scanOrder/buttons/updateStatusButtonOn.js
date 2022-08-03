import React from "react";

const UpdateStatusButtonOn = (props) => {
  const { saveUpdateFunc } = props;

  const handleInput = () => {
    saveUpdateFunc();
  };

  return (
    <>
      <button
        onClick={handleInput}
        className="btn btn-success statusButton"
        data-button-function="Update Enabled"
      >
        <strong>{"UPDATE STATUS"}</strong>
      </button>
    </>
  );
};

export default UpdateStatusButtonOn;
