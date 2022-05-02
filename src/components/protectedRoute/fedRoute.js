import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { isFed, orderControl } from "./permissions";

function FedRoute({ component: Component, ...rest }) {
  const history = useHistory();

  return (
    <Route
      {...rest}
      render={(props) => {
        return isFed() && orderControl() ? (
          <Component {...props} />
        ) : (
          <Redirect to={history.goBack} />
        );
      }}
    />
  );
}

export default FedRoute;
