import React from "react";

import { isUser } from "../components/protectedRoute/permissions";
import LoginSubComponent from "../components/loginSubComponent";
import ScanView from "../components/scanOrder/scanView";

const ScanOrder = (props) => {
  return isUser() ? (
    <ScanView scanId={props.match.params.id} />
  ) : (
    <LoginSubComponent />
  );
};

export default ScanOrder;
