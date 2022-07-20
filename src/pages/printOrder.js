import React from "react";
import { useRouteMatch } from "react-router-dom";

import { isUser } from "../components/permissions";
import LoginSubComponent from "../components/loginSubComponent";
import PrintView from "../components/printView";

const PrintOrder = () => {
  const match = useRouteMatch("/print/:id");

  return isUser() ? (
    <PrintView printId={match.params.id} />
  ) : (
    <LoginSubComponent />
  );
};

export default PrintOrder;
