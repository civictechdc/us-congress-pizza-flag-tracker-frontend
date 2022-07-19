import React from "react";
import { Redirect } from "react-router-dom";

import { editOrderControl, isUser } from "../components/permissions";
import EditView from "../components/editView";
import LoginSubComponent from "../components/loginSubComponent";

const EditOrder = (props) => {
  return isUser() ? (
    editOrderControl() ? (
      <EditView editId={props.match.params.id} history={props.history} />
    ) : (
      <Redirect to="/" />
    )
  ) : (
    <LoginSubComponent />
  );
};

export default EditOrder;
