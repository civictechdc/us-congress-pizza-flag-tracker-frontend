import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isFed, orderControl } from "./permissions";

function FedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return isFed() && orderControl() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/orders" />
        );
      }}
    />
  );
}

export default FedRoute;
