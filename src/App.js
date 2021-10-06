import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";

import AddOrder from "./components/AddOrder";
import AuthService from "./services/AuthService";
import Login from "./components/Login";
import EditOrder from "./components/EditOrder";
import OrdersList from "./components/OrdersList";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Header from "./components/Header";


function App() {
  return (<>
      <Header/>

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

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/orders"]} component={OrdersList} />
          <PrivateRoute exact path="/add">
            <AddOrder/>
          </PrivateRoute>
          <Route path="/orders/:id" component={Order} />
          <Route exact path="/login" component={Login}/>
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
