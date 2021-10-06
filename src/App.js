import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";

import AddOrder from "./components/AddOrder";
import Order from "./components/Order";
import OrdersList from "./components/OrdersList";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Header from "./components/Header";


function App() {
  return (<>
      <Header/>

    <main className="flex-shrink-0" role="main">

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
