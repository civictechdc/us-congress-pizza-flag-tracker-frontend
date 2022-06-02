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

  // const resolveAfter6Seconds = () => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve("resolved");
  //     }, 6000);
  //   });
  // };

  // const asyncCall = async () => {
  //   await resolveAfter6Seconds();
  //   setRedirectNow("yes");
  // };

  // useEffect(() => {
  //   resetDatabase();
  // }, []);

  // asyncCall();

  const closePopUpBox = () => {
    setPopUpBox("none");
  };

  return (
    <>
      <div className={styles.formContainer}>
        <button onClick={resetDatabase} className={`btn btn-success`}>
          Reset Database
        </button>
        {/* <h2 style={{ textAlign: "center" }}>
          Please wait a moment for the database to reset.
        </h2>
        <h2 style={{ textAlign: "center" }}>
          You may need to refresh the Orders page if the database hasn't
          finished repopulating
        </h2> */}
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
