import React from "react";

const PopUpBox = (props) => {
  const { closePopUpBox, message, popUpBox } = props;

  return (
    <div className="pop-container" style={{ display: popUpBox }}>
      <div className="pop-up" onClick={closePopUpBox}>
        <h3>{message}</h3>
      </div>
    </div>
  );
};

export default PopUpBox;
