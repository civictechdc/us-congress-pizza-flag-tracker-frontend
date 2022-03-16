import { useLocation } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";
import { userOffice, statusControl } from "./permissions";

function ScanRoute({ component: Component, ...rest }) {
  const location = useLocation();
  const orderNum = location.state.order;

  const allow = () => {
    if (statusControl() == "ALL" || orderNum) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        return allow() ? <Component {...props} /> : <Redirect to="/orders" />;
      }}
    />
  );
}

export default ScanRoute;
