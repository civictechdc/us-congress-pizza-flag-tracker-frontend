import "./style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";

import AddOrder from "./components/pages/addOrder";
import Login from "./components/pages/login";
import EditOrder from "./components/pages/editOrder";
import OrdersList from "./components/pages/ordersList";
import UserRoute from "./components/protectedRoute/userRoute";
import AdminRoute from "./components/protectedRoute/adminRoute";
import FedRoute from "./components/protectedRoute/fedRoute";
import PrintOrder from "./components/pages/printOrder";
import ScanOrder from "./components/pages/scanOrder";
import Profile from "./components/pages/profile";

import Header from "./components/header/header";
import AddUser from "./components/pages/addUser";

function App() {
  return (
    <>
      <Header />

      <main>
        <div className="mainContainer">
          <Switch>
            <Route exact path="/login" component={Login} />
            <UserRoute exact path={["/", "/orders"]} component={OrdersList} />
            <UserRoute path="/print/:id" component={PrintOrder} />
            <UserRoute path="/scan/:id" component={ScanOrder} />
            <UserRoute exact path="/profile" component={Profile} />
            <AdminRoute path="/orders/:id" component={EditOrder} />
            <AdminRoute exact path="/users/add" component={AddUser} />
            <FedRoute exact path="/add" component={AddOrder} />
          </Switch>
        </div>
      </main>
      {/* */}
      <footer className="footer mt-auto py-3">
        <div className="container">
          <span className="text-muted">
            <div className="mt-3 ml-3">
              A project of <a href="https://codefordc.org">Code for DC</a>
              .&nbsp;
              <a href="https://github.com/codefordc/us-congress-pizza-flag-tracker-frontend/">
                Open Source on GitHub
              </a>
              . Hosted by <a href="https://netlify.com/">Netlify</a>
            </div>
          </span>
        </div>
      </footer>
    </>
  );
}

export default App;
