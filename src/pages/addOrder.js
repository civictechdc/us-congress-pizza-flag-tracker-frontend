import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import AddView from "../components/addView";
import { editOrderControl, isUser } from "../components/permissions";
import LoginSubComponent from "../components/loginSubComponent";
import UserContext from "../components/userContext";

const AddOrder = () => {
  const { setUserDisplay } = useContext(UserContext);  // rerenders when user logs in

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
