import React from "react";

import { isUser } from "../components/protectedRoute/permissions";
import LoginSubComponent from "../components/loginSubComponent";
import OrdersView from "../components/ordersView";

const OrdersList = () => {
  return isUser() ? <OrdersView /> : <LoginSubComponent />;
};

export default OrdersList;
