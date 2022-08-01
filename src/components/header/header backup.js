import React from "react";
import Publicheader from "./publicHeader";
import Privateheader from "./privateHeader";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));

  let isUserLoggedIn = () => {
    if (user && user.accessToken) {
      return true;
    } else {
      return false;
    }
  };

  return <>{isUserLoggedIn() ? <Privateheader /> : <Publicheader />}</>;
}

export default Header;
