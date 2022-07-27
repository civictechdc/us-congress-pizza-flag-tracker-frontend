import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import AddUserView from "../components/addUserView";
import { adminControl, isUser } from "../components/permissions";
import LoginSubComponent from "../components/loginSubComponent";
import UserContext from "../components/userContext";

const AddUser = () => {
  const { setUserDisplay } = useContext(UserContext);  // rerenders when user logs in

  return isUser() ? (
    adminControl() ? (
      <AddUserView />
    ) : (
      <Navigate to="/" replace />
    )
  ) : (
    <LoginSubComponent />
  );
};

export default AddUser;
