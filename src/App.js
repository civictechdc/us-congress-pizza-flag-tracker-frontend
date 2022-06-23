import "./style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import { useState, useMemo } from "react";

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
import EditorRoute from "./components/protectedRoute/editorRoute";
import AdminRoute from "./components/protectedRoute/adminRoute";
import FedRoute from "./components/protectedRoute/fedRoute";
import Header from "./components/header/header";
import Background from "./components/background";
import Refresh from "./components/refresh";
import DemoLogIn from "./components/demoLogIn";
import UserContext from "./components/userContext";

function App() {
  const [userDisplay, setUserDisplay] = useState("");
  const value = useMemo(() => ({ userDisplay, setUserDisplay }), [userDisplay]);

  return (
    <>
      <Background />

      {/* Header doesn't use UserContext.Provider value directly, but instead updates and rerenders when other components (primarily DemoLogIn) change the value */}
      <UserContext.Provider value={value}>
        <Header />
      </UserContext.Provider>

      <main className="mainContainer">
        <Switch>
          <UserContext.Provider value={value}>
            {/* DemoLogIn should be removed prior to production */}
            <Route
              path={["/demoLogin", "/*/demoLogin"]}
              component={DemoLogIn}
            />{" "}
            <Route exact path="/login" component={Login} />
            <Route exact path={["/", "/orders"]} component={OrdersList} />
            <Route path="/print/:id" component={PrintOrder} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/scan/:id" component={ScanOrder} />
            <EditorRoute path="/orders/:id" component={EditOrder} />
            <AdminRoute exact path="/users/add" component={AddUser} />
            <FedRoute exact path="/add" component={AddOrder} />
            {/* Refresh should be removed prior to production */}
            <Route exact path="/refresh" component={Refresh} />{" "}
          </UserContext.Provider>
        </Switch>
      </main>
      {/* */}
      <footer className="footer-container"></footer>
    </>
  );
}

export default App;
