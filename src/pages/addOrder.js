import React from "react";
import { Navigate } from "react-router-dom";

import AddView from "../components/addView";
import { editOrderControl, isUser } from "../components/permissions";
import LoginSubComponent from "../components/loginSubComponent";

const AddOrder = () => {
  return isUser() ? (
    editOrderControl() ? (
      <AddView />
    ) : (
      <Navigate to="/" replace />
    )
  ) : (
    <LoginSubComponent />
  );
};

export default AddOrder;
