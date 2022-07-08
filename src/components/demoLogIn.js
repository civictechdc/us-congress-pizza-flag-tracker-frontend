import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import PopUpBoxComponent from "./popUpBoxComponent";
import UserContext from "./userContext";
import AuthService from "../service/authService";
import styles from "../style/orderForm.module.css";

//This component should be removed prior to production

const DemoLogIn = () => {
  const initialMessageState = {
    text: "Login Updated, click this box to continue",
  };

  const [message, setMessage] = useState(initialMessageState);
  const [popUpBox, setPopUpBox] = useState("none");
  const { setUserDisplay } = useContext(UserContext);

  const history = useHistory();
  const params = new URLSearchParams(document.location.search);
  const userName = params.get("q");
  const password = userName + "-1010";
  const priorLocation = document.location.pathname.slice(0, -10);

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
    setUserDisplay();
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
