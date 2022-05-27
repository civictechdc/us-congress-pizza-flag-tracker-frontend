import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import OrderDataService from "../service/orderService";

const Refresh = (props) => {
  const resetDatabase = () => {
    return OrderDataService.reset()
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    resetDatabase();
  }, []);

  return (
    <>
      <p>Hello World!</p>
      <Route exact path="/refresh">
        <Redirect to="/orders" />
      </Route>
    </>
  );
};

export default Refresh;
