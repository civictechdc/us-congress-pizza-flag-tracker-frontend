import React from "react";
import { useRouteMatch } from "react-router-dom";

import { isUser } from "../components/permissions";
import LoginSubComponent from "../components/loginSubComponent";
import ScanView from "../components/scanOrder/scanView";

const ScanOrder = () => {
  const match = useRouteMatch("/scan/:id");

  return isUser() ? (
    <ScanView scanId={match.params.id} />
  ) : (
    <LoginSubComponent />
  );
};

export default ScanOrder;
