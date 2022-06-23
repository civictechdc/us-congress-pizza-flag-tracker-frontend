import React from "react";

import { isUser } from "../components/protectedRoute/permissions";
import LoginSubComponent from "../components/loginSubComponent";
import ScanView from "../components/scanView";

const ScanOrder = (props) => {
  console.log("props, ", props);

  return isUser() ? (
    <ScanView scanId={props.match.params.id} />
  ) : (
    <LoginSubComponent />
  );
};

export default ScanOrder;
