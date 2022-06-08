import { createContext, useContext, useMemo } from "react";
import React, { useState, useEffect } from "react";
import { Route, Redirect, generatePath, useHistory } from "react-router-dom";
import PopUpBoxComponent from "./popUpBoxComponent";
import UserContext from "./userContext";
import AuthService from "../service/authService";
import OrderDataService from "../service/orderService";
import styles from "../style/orderForm.module.css";

//This component should be removed prior to production

const DemoLogIn = () => {
  const initialMessageState = {
    checkSaved: true,
    isLastChangeUSState: false,
    text: "Login Updated, click this box to continue",
  };

  const [message, setMessage] = useState(initialMessageState);
  const [popUpBox, setPopUpBox] = useState("none");
  const { userDisplay, setUserDisplay } = useContext(UserContext);

  const history = useHistory();

  const params = new URLSearchParams(document.location.search);
  const userName = params.get("q");
  console.log("Username: ", userName);
  const password = userName + "-1010";
  console.log("Password: ", password);

  const priorLocation = document.location.pathname.slice(0, -10);
  console.log("Loc Editted: ", priorLocation);

  const logIn = (userName, password) => {
    return AuthService.login(userName, password)
      .then((response) => {
        console.log(response);
        setPopUpBox("block");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    logIn(userName, password);
  }, [userName, password]);

  const closePopUpBox = () => {
    // the value set is largely unimportant; rather the setting of any value will force Header component
    // to rerender and display the updated login information
    setUserDisplay(1);
    history.push(priorLocation);
  };

  return (
    <>
      <div className={styles.formContainer}>
        Updating User Account: Demo Use Only
      </div>
      <PopUpBoxComponent
        closePopUpBox={closePopUpBox}
        message={message}
        popUpBox={popUpBox}
      />
    </>
  );
};

export default DemoLogIn;
