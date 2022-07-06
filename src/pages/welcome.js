import React from "react";

import { isUser } from "../components/protectedRoute/permissions";
import LoginSubComponent from "../components/loginSubComponent";
import ScanView from "../components/scanOrder/scanView";

const Welcome = (props) => {
  return (
    <>
      <h2>Hello World!</h2>
    </>
  );
};

export default Welcome;
