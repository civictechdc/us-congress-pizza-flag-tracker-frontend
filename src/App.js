import "./style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";

import AddOrder from "./pages/addOrder";
import Login from "./pages/login";
import EditOrder from "./pages/editOrder";
import OrdersList from "./pages/ordersList";
import ScanOrder from "./pages/scanOrder";
import Profile from "./pages/profile";
import PrintOrder from "./pages/printOrder";
import AddUser from "./pages/addUser";

import UserRoute from "./components/protectedRoute/userRoute";
import ScanRoute from "./components/protectedRoute/scanRoute";
import AdminRoute from "./components/protectedRoute/adminRoute";
import FedRoute from "./components/protectedRoute/fedRoute";
import Header from "./components/header/header";
import Background from "./components/background";
import Refresh from "./components/refresh";

function App() {
  return (
    <>
      <Background />
      <Header />

      <main className="mainContainer">
        <Switch>
          <Route exact path="/login" component={Login} />
          <UserRoute exact path={["/", "/orders"]} component={OrdersList} />
          <UserRoute path="/print/:id" component={PrintOrder} />
          <UserRoute exact path="/profile" component={Profile} />
          <ScanRoute path="/scan/:id" component={ScanOrder} />
          <AdminRoute path="/orders/:id" component={EditOrder} />
          <AdminRoute exact path="/users/add" component={AddUser} />
          <FedRoute exact path="/add" component={AddOrder} />
          <Route exact path="/refresh" component={Refresh} />
        </Switch>
      </main>
      {/* */}
      <footer className="footer-container"></footer>
    </>
  );
}

export default App;
