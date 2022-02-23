import { Route, Redirect } from "react-router-dom";
import { userOffice, statusControl } from "./permissions";

function ScanRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return statusControl() === "All" || statusControl() == userOffice() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/orders" />
        );
      }}
    />
  );
}

export default ScanRoute;
