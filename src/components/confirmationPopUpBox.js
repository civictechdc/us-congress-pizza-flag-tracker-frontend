import React from "react";

const ConfirmationPopUpBox = (props) => {
  const { closePopUpBox, deleteOrderFunc, message, popUpBox, setShowLog } = props;

  const handleClick = () => {
    setShowLog(false);
    deleteOrderFunc();
  }

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
              Yes
            </button>
            <button className={`btn btn-danger mr-2`} onClick={closePopUpBox}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopUpBox;
