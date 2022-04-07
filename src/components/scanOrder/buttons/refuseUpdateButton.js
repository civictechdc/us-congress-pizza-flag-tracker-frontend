import React from "react";

const RefuseUpdateButton = (props) => {
  const { refuseUpdateFunc } = props;

  const handleInput = () => {
    refuseUpdateFunc();
  };

  return (
    <>
      <button
        onClick={handleInput}
        className="btn btn-success"
        style={{ opacity: 0.6 }}
      >
        {"Update Status"}
      </button>
    </>
  );
};

export default RefuseUpdateButton;
