import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { editOrderControl } from "./permissions";

function EditorRoute({ component: Component, ...rest }) {
  const history = useHistory();

  return (
    <Route
      {...rest}
      render={(props) => {
        return editOrderControl() ? (
          <Component {...props} />
        ) : (
          <Redirect to={history.goBack} />
        );
      }}
    />
  );
}

export default EditorRoute;
