import React from "react";
import { Redirect } from "react-router-dom";

import { editOrderControl } from "../components/protectedRoute/permissions";
import { isUser } from "../components/protectedRoute/permissions";
import LoginSubComponent from "../components/loginSubComponent";
import AddView from "../components/addView";

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
