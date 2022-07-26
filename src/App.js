import "./style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Routes, Outlet } from "react-router-dom";
import { useState, useMemo } from "react";

import Layout from "./pages/Layout";
import AddOrder from "./pages/addOrder";
import Login from "./pages/login";
import EditOrder from "./pages/editOrder";
import OrdersList from "./pages/ordersList";
import ScanOrder from "./pages/scanOrder";
import Profile from "./pages/profile";
import PrintOrder from "./pages/printOrder";
import AddUser from "./pages/addUser";

import Header from "./components/header/header";
import Background from "./components/background";
import Refresh from "./components/refresh";
import DemoLogIn from "./components/demoLogIn";
import UserContext from "./components/userContext";
import Welcome from "./pages/welcome";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<OrdersList />} />
        {/* DemoLogIn should be removed prior to production */}
        <Route path="/demoLogin" element={<DemoLogIn />} />
        <Route path="login" element={<Login />} />
        <Route path="orders" element={<OrdersList />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/demoLogin" element={<DemoLogIn />} />
        <Route path="refresh" element={<Refresh />} />
        <Route path="welcome" element={<Welcome />} />
        <Route path="*" element={<OrdersList />} />
      </Route>
    </Routes>
  );
}

export default App;

/*
            <Route exact path="/welcome">
              <Welcome />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/print/:id">
              <PrintOrder />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/scan/:id">
              <ScanOrder />
            </Route>
            <Route exact path="/orders/:id">
              <EditOrder />
            </Route>
            <Route exact path="/users/add">
              <AddUser />
            </Route>
            <Route exact path="/add">
              <AddOrder />
            </Route>
*/
