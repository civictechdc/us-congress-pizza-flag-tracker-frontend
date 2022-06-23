import React from "react";

import { isUser } from "../components/protectedRoute/permissions";
import LoginSubComponent from "../components/loginSubComponent";
import PrintView from "../components/printView";

const PrintOrder = (props) => {
  return isUser() ? (
    <PrintView printId={props.match.params.id} />
  ) : (
    <LoginSubComponent />
  );
};

export default PrintOrder;
