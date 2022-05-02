import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { adminControl } from "./permissions";

function AdminRoute({ component: Component, ...rest }) {
  const history = useHistory();

  return (
    <Route
      {...rest}
      render={(props) => {
        return adminControl() ? (
          <Component {...props} />
        ) : (
          <Redirect to={history.goBack} />
        );
      }}
    />
  );
}

export default AdminRoute;
