import React from "react";

const UpdateStatusButtonOn = (props) => {
  const { saveUpdateFunc } = props;

  const handleInput = () => {
    saveUpdateFunc();
  };

  return (
    <>
      <button onClick={handleInput} className="btn btn-success">
        <strong>{"UPDATE STATUS"}</strong>
      </button>
    </>
  );
};

export default UpdateStatusButtonOn;
