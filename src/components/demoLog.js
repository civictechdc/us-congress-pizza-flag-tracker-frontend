import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import PopUpBoxComponent from "./popUpBoxComponent";
import OrderDataService from "../service/orderService";
import styles from "../style/orderForm.module.css";

const DemoLog = (props) => {
  const initialMessageState = {
    checkSaved: true,
    isLastChangeUSState: false,
    text: "Please wait a moment for the database to reset.",
  };

  const [message, setMessage] = useState(initialMessageState);
  const [popUpBox, setPopUpBox] = useState("none");

  const closePopUpBox = () => {
    setPopUpBox("none");
    setMessage({
      ...message,
      text: "Please wait a moment for the database to reset.",
    });
  };

  return (
    <>
      <div className={styles.formContainer}>Hello World!</div>
      {/* {redirectNow ? (
        <Route exact path="/refresh">
          <Redirect to="/orders" />
        </Route>
      ) : (
        <></>
      )} */}
      <PopUpBoxComponent
        closePopUpBox={closePopUpBox}
        message={message}
        popUpBox={popUpBox}
      />
    </>
  );
};

export default DemoLog;
