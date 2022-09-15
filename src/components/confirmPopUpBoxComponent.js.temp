import React from "react";

const ConfirmPopUpBoxComponent = (props) => {
  const { closePopUpBox, message, popUpBox, handleClick } = props;

  return (
    <div className="pop-container" style={{ display: popUpBox }}>
      <div className="pop-up">
        <h3>{message}</h3>
        <button onClick={handleClick} className={`btn btn-success`}>
          Confirm
        </button>
        <button className={`btn btn-danger mr-2`} onClick={closePopUpBox}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmPopUpBoxComponent;
