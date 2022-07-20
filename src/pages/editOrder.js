import React from "react";
import { Redirect, useHistory, useRouteMatch } from "react-router-dom";

import { editOrderControl, isUser } from "../components/permissions";
import EditView from "../components/editView";
import LoginSubComponent from "../components/loginSubComponent";

const EditOrder = () => {
  const match = useRouteMatch("/orders/:id");
  let history = useHistory();

  return isUser() ? (
    editOrderControl() ? (
      <EditView editId={match.params.id} history={history} />
    ) : (
      <Redirect to="/" />
    )
  ) : (
    <LoginSubComponent />
  );
};

export default EditOrder;
