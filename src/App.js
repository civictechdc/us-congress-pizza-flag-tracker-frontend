import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link } from "react-router-dom";

import AddOrder from "./components/AddOrder";
import Order from "./components/Order";
import OrdersList from "./components/OrdersList";

function App() {
  return (<>
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
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>
    </header>

    <main className="flex-shrink-0" role="main">

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/orders"]} component={OrdersList} />
          <Route exact path="/add" component={AddOrder} />
          <Route path="/orders/:id" component={Order} />
        </Switch>
      </div>
    </main>
      {/* */}
    <footer className="footer mt-auto py-3">
      <div className="container">
        <span className="text-muted"><div className="mt-3 ml-3">
        A project of <a href="https://codefordc.org">Code for DC</a>.&nbsp;
        <a href="https://github.com/codefordc/us-congress-pizza-flag-tracker-frontend/">
          Open Source on GitHub</a>. 
          Hosted by <a href="https://netlify.com/">Netlify</a>
      </div> 
      </span>
      </div>
    </footer>
    </>
  );
}

export default App;
