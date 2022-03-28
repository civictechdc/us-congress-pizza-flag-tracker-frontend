import React from "react";

const UpdateStatusButtonOff = (props) => {
  const { saveUpdateFunc } = props;

  const handleInput = () => {
    saveUpdateFunc();
  };

  return (
    <>
      <button onClick={handleInput} className="btn btn-success" disabled>
        {"Update Status"}
      </button>
    </>
  );
};

export default UpdateStatusButtonOff;
