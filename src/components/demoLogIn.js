import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PopUpBoxComponent from "./popUpBoxComponent";
import UserContext from "./userContext";
import AuthService from "../service/authService";
import styles from "../style/orderForm.module.css";

//This component should be removed prior to production

const DemoLogIn = () => {
  const [message, setMessage] = useState(
    "Login Updated, click this box to continue"
  );
  const [popUpBox, setPopUpBox] = useState("none");
  const { setUserDisplay } = useContext(UserContext);

  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);

  const userName = params.get("q");
  const password = userName + "-1010";
  const priorLocation = window.location.pathname.slice(0, -9);

  const logIn = async (userName, password) => {
    const response = await AuthService.login(userName, password).then((response) => {
      setMessage("Login Updated, click this box to continue");
    }).catch((err) => {
      setMessage("Issue: " + err);
    });
    setPopUpBox("block");
  };

  useEffect(() => {
    logIn(userName, password);
  }, [userName, password]);

  const closePopUpBox = () => {
    setUserDisplay();
    navigate(priorLocation);
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
