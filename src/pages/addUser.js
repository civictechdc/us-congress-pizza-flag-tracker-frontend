import React from "react";
import { Redirect } from "react-router-dom";

import AddUserView from "../components/addUserView";
import { adminControl, isUser } from "../components/protectedRoute/permissions";
import LoginSubComponent from "../components/loginSubComponent";

const AddUser = () => {
  return isUser() ? (
    adminControl() ? (
      <AddUserView />
    ) : (
      <Redirect to="/orders" />
    )
  ) : (
    <LoginSubComponent />
  );
};

export default AddUser;
