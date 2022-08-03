import React, { useContext } from "react";

import { isUser } from "../components/permissions";
import OrdersView from "../components/ordersView";
import UserContext from "../components/userContext";
import Welcome from "./welcome";

const OrdersList = () => {
  const { setUserDisplay } = useContext(UserContext); // rerenders when user logs in

  return isUser() ? <OrdersView /> : <Welcome />;
};

export default OrdersList;
