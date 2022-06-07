import React, { useState, useEffect } from "react";
import { Route, Redirect, generatePath } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";
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
  const [reload, setReload] = useState("yes");
  // const [redirectNow, setRedirectNow] = useState("");
  let redirectNow = "";
  // let reload = "yes";
  const history = useHistory();

  const params = new URLSearchParams(document.location.search);
  console.log("Loc: ", document.location.pathname);
  const priorLocation = document.location.pathname.slice(0, -10);
  console.log("Loc Editted: ", priorLocation);

  const userName = params.get("q");
  console.log("Username: ", userName);
  const password = userName + "-1010";
  console.log("Password: ", password);

  const logIn = (userName, password) => {
    return AuthService.login(userName, password)
      .then((response) => {
        console.log(response);
        setPopUpBox("block");
        // if (reload === "yes") {
        //   setReload("no");
        // window.location.reload();
        // }
        // redirectNow = "yes";
        // window.location.reload();
        // setRedirectNow("yes");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // useEffect(() => {

  // //   // AuthService.logout();
  // //  logIn(userName, password);
  //  console.log("logging");
  // //   // window.location.reload();
  // //   // setRedirectNow("yes");
  // }, [userName, password]);

  logIn(userName, password);
  console.log("redirect: ", redirectNow);

  const closePopUpBox = () => {
    // redirectNow = "yes";
    // setPopUpBox("none");
    const path = generatePath(priorLocation);
    console.log("Path: ", path);
    const destination = history.push(path);
    return destination;
  };

  return (
    <>
      <div className={styles.formContainer}>Hello World!</div>
      {/*
      {redirectNow ? (
        <Route path="/*/}
      {/* demoLogin">
          <Redirect to={priorLocation} />
        </Route>
      ) : (
        <></>
      )}
      */}
      <PopUpBoxComponent
        closePopUpBox={closePopUpBox}
        message={message}
        popUpBox={popUpBox}
      />
    </>
  );
};

export default DemoLogIn;
