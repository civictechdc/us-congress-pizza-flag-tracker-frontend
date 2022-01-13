import "./style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";

import AddOrder from "./components/Pages/AddOrder";
import Login from "./components/Pages/Login";
import EditOrder from "./components/Pages/EditOrder";
import OrdersList from "./components/Pages/OrdersList";
import UserRoute from "./components/Protected/UserRoute";
import AdminRoute from "./components/Protected/AdminRoute";
import FedRoute from "./components/Protected/FedRoute";
import ScanOrder from "./components/Pages/ScanOrder";
import Profile from "./components/Pages/Profile";

import Header from "./components/Header";
import AddUser from "./components/Pages/AddUser";

function App() {
  return (
    <>
      <Header />

      <main>
        <div className="mainContainer">
          <Switch>
            <Route exact path="/login" component={Login} />
            <UserRoute exact path={["/", "/orders"]} component={OrdersList}/>
            <UserRoute path="/scan/:id" component={ScanOrder}/>
            <UserRoute exact path="/profile" component={Profile}/>
            <AdminRoute path="/orders/:id" component={EditOrder}/>
            <AdminRoute exact path="/users/add" component={AddUser}/>
            <FedRoute exact path="/add" component={AddOrder}/>

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
