import React from "react";
import { Redirect } from "react-router-dom";

import AddView from "../components/addView";
import {
  editOrderControl,
  isUser,
} from "../components/protectedRoute/permissions";
import LoginSubComponent from "../components/loginSubComponent";

const AddOrder = () => {
  return isUser() ? (
    editOrderControl() ? (
      <AddView />
    ) : (
      <Redirect to="/orders" />
    )
  ) : (
    <LoginSubComponent />
  );
};

export default AddOrder;
