import React from "react";

const ConfirmPopUpBoxComponent = (props) => {
  const { closePopUpBox, message, popUpBox, handleClick } = props;

  return (
    <div className="pop-container" style={{ display: popUpBox }}>
      <div className={`pop-up pop-up-confirm-dialog`}>
        <div>
          <h3>{message}</h3>
          <div className="pop-button-container">
            <button
              onClick={handleClick}
              className={`btn btn-success pop-button`}
            >
              Confirm
            </button>
            <button className={`btn btn-danger mr-2`} onClick={closePopUpBox}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopUpBoxComponent;
