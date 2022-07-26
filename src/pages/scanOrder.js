import React from "react";
import { useParams } from "react-router-dom";

import { isUser } from "../components/permissions";
import LoginSubComponent from "../components/loginSubComponent";
import ScanView from "../components/scanOrder/scanView";

const ScanOrder = () => {
  const params = useParams("/scan/:id");

  return isUser() ? <ScanView scanId={params.id} /> : <LoginSubComponent />;
};

export default ScanOrder;
