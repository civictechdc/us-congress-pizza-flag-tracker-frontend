import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import PopUpBoxComponent from "./popUpBoxComponent";
import OrderDataService from "../service/orderService";
import styles from "../style/orderForm.module.css";

const Refresh = (props) => {
  const initialMessageState = {
    checkSaved: true,
    isLastChangeUSState: false,
    text: "Please wait a moment for the database to reset.",
  };

  const [message, setMessage] = useState(initialMessageState);
  const [popUpBox, setPopUpBox] = useState("none");
  const [redirectNow, setRedirectNow] = useState("");

  const resetDatabase = () => {
    setPopUpBox("block");
    return OrderDataService.reset()
      .then((response) => {
        console.log(response);
        setRedirectNow("yes");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const closePopUpBox = () => {
    setPopUpBox("none");
  };

  return (
    <>
      <div className={styles.formContainer}>
        <button onClick={resetDatabase} className={`btn btn-success`}>
          Reset Database
        </button>
      </div>
      {redirectNow ? (
        <Route exact path="/refresh">
          <Redirect to="/orders" />
        </Route>
      ) : (
        <></>
      )}
      <PopUpBoxComponent
        closePopUpBox={closePopUpBox}
        message={message}
        popUpBox={popUpBox}
      />
    </>
  );
};

export default Refresh;
