import React from "react";

const UpdateStatusButtonOff = (props) => {
  const { saveUpdateFunc } = props;

  const handleInput = () => {
    saveUpdateFunc();
  };

  return (
    <>
      <button onClick={handleInput} className="btn btn-success" disabled>
        <strong>{"UPDATE STATUS"}</strong>
      </button>
    </>
  );
};

export default UpdateStatusButtonOff;
