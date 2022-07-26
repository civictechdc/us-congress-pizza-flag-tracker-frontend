import React from "react";
import { useParams } from "react-router-dom";

import { isUser } from "../components/permissions";
import LoginSubComponent from "../components/loginSubComponent";
import PrintView from "../components/printView";

const PrintOrder = () => {
  const params = useParams("/print/:id");

  return isUser() ? <PrintView printId={params.id} /> : <LoginSubComponent />;
};

export default PrintOrder;
