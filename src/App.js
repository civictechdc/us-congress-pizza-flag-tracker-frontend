import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link } from "react-router-dom";

import AddOrder from "./components/AddOrder";
import AuthService from "./services/AuthService";
import Login from "./components/Login";
import Order from "./components/Order";
import OrdersList from "./components/OrdersList";
import AddUser from "./components/AddUser";

let count = 0;

function App() {
  const username = AuthService.getCurrentUserName();
  function logOut() {
    AuthService.logout();
  }
  return (
    <>
      <header>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/orders" className="navbar-brand">
            Flagpizza
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/orders"} className="nav-link">
                Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/orders/add"} className="nav-link">
                Add Order
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link"></Link>
            </li>
            <li className="nav-item">
              <Link to={"/users/add"} className="nav-link">
                Add User
              </Link>
            </li>
          </div>

          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Log Out
              </a>
            </li>
          </div>
        </nav>
      </header>

      <main className="flex-shrink-0" role="main">
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/orders"]} component={OrdersList} />
            <Route exact path="/orders/add" component={AddOrder} />
            <Route path="/orders/:id" component={Order} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/users/add" component={AddUser} />
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
