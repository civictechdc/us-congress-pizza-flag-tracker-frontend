import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import PopUpBox from "./popUpBox";
import OrderDataService from "../service/orderService";
import styles from "../style/orderForm.module.css";

//This component should be removed prior to production

const Refresh = () => {
  const [message, setMessage] = useState(
    "Please wait a moment for the database to reset."
  );
  const [popUpBox, setPopUpBox] = useState("none");
  const [navigateNow, setNavigateNow] = useState("");

  const resetDatabase = () => {
    setPopUpBox("block");
    return OrderDataService.reset()
      .then((response) => {
        setNavigateNow("yes");
      })
      .catch((e) => {
        setMessage("Network Error, please see your IT Administrator");
      });
  };

  const closePopUpBox = () => {
    setPopUpBox("none");
    setMessage("Please wait a moment for the database to reset.");
  };

  return (
    <>
      <div className={styles.formContainer}>
        <button onClick={resetDatabase} className={`btn btn-success`}>
          Reset Database
        </button>
      </div>
      {navigateNow ? <Navigate to="/" replace /> : <></>}
      <PopUpBox
        closePopUpBox={closePopUpBox}
        message={message}
        popUpBox={popUpBox}
      />
    </>
  );
};

export default Refresh;
