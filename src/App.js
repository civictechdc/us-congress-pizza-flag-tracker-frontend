import "./style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";

import AddOrder from "./pages/addOrder";
import Login from "./pages/login";
import EditOrder from "./pages/editOrder";
import OrdersList from "./pages/ordersList";
import UserRoute from "./components/protectedRoute/userRoute";
import AdminRoute from "./components/protectedRoute/adminRoute";
import FedRoute from "./components/protectedRoute/fedRoute";
import ScanOrder from "./pages/scanOrder";
import Profile from "./pages/profile";
import PrintOrder from "./pages/printOrder";

import Header from "./components/header/header";
import AddUser from "./pages/addUser";

function App() {
  return (
    <>
      <Header />

      <main className="mainContainer">
        
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
        
      </main>
      {/* */}
      <footer className="footer-container">
        
        
      </footer>
    </>
  );
}

export default App;
