import React from "react";
import styles from "../style/orderForm.module.css";

const PopUpBoxComponent = (props) => {
  const { closePopUpBox, message, popUpBox } = props;

  return (
    <div className="pop-container" style={{ display: popUpBox }}>
      <div className="pop-up" onClick={closePopUpBox}>
        <h3>{message.text}</h3>
      </div>
    </div>
  );
};

export default PopUpBoxComponent;
