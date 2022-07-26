import React from "react";
import { Navigate } from "react-router-dom";

import AddUserView from "../components/addUserView";
import { adminControl, isUser } from "../components/permissions";
import LoginSubComponent from "../components/loginSubComponent";

const AddUser = () => {
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
