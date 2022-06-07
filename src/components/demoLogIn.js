import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import PopUpBoxComponent from "./popUpBoxComponent";
import AuthService from "../service/authService";
import OrderDataService from "../service/orderService";
import styles from "../style/orderForm.module.css";

const DemoLogIn = (props) => {
  const initialMessageState = {
    checkSaved: true,
    isLastChangeUSState: false,
    text: "Please wait a moment for the database to reset.",
  };

  const [message, setMessage] = useState(initialMessageState);
  const [popUpBox, setPopUpBox] = useState("none");
  const [redirectNow, setRedirectNow] = useState("");

  const closePopUpBox = () => {
    setPopUpBox("none");
    setMessage({
      ...message,
      text: "Please wait a moment for the database to reset.",
    });
  };

  let params = new URLSearchParams(document.location.search);
  console.log("q: ", params.get("q"));
  console.log("Loc: ", document.location.pathname);
  let priorLocation = document.location.pathname.slice(0, -10);
  console.log("Loc Editted: ", priorLocation);

  useEffect(() => {
    // setRedirectNow("yes");
    AuthService.logout();
    // window.location.reload();
  }, [redirectNow]);

  return (
    <>
      <div className={styles.formContainer}>Hello World!</div>
      {redirectNow ? (
        <Route path="/*/demoLogin">
          <Redirect to={priorLocation} />
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

export default DemoLogIn;
