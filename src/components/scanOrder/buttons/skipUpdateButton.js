import React from "react";

const SkipUpdateButton = (props) => {
  const { skipUpdateFunc } = props;

  const handleInput = () => {
    skipUpdateFunc();
  };

  return (
    <>
      <button onClick={handleInput} className={"btn btn-success"}>
        <strong>{"UPDATE STATUS SKIP TEST"}</strong>
      </button>
    </>
  );
};

export default SkipUpdateButton;
