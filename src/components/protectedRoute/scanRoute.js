import { useLocation, useHistory } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";
import { userOffice, statusControl } from "./permissions";

function ScanRoute({ component: Component, ...rest }) {
  const history = useHistory();
  const location = useLocation();
  const officeCode = location.state;
  const orderOfficeCheckValue =
    officeCode === undefined ? "FROMQR" : location.state.orderOfficeCheck;

  const allow = () => {
    if (statusControl() == "ALL" || orderOfficeCheckValue) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        return orderOfficeCheckValue === "FROMQR" ? (
          <Redirect
            to={{
              pathname: "/login",
              state: { destination: location.pathname, from: "QR" },
            }}
          />
        ) : allow() ? (
          <Component {...props} />
        ) : (
          <Redirect to={history.goBack} />
        );
      }}
    />
  );
}

export default ScanRoute;
