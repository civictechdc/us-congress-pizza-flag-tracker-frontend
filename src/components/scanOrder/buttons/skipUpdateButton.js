import React from "react";

const SkipUpdateButton = (props) => {
  const { skipUpdateFunc } = props;

  const handleInput = () => {
    skipUpdateFunc();
  };

  return (
    <>
      <button
        onClick={handleInput}
        className={"btn btn-success statusButton"}
        data-button-function="Skip Enabled"
      >
        <strong>{"UPDATE STATUS"}</strong>
      </button>
    </>
  );
};

export default SkipUpdateButton;
