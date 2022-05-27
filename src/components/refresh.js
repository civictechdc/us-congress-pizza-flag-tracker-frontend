import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import OrderDataService from "../service/orderService";

const Refresh = (props) => {
  const [redirectNow, setRedirectNow] = useState("");

  const resetDatabase = () => {
    return OrderDataService.reset()
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const resolveAfter5Seconds = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("resolved");
      }, 5000);
    });
  };

  const asyncCall = async () => {
    console.log("calling");
    const result = await resolveAfter5Seconds();
    console.log(result);
    setRedirectNow("yes");
    // expected output: "resolved"
  };

  useEffect(() => {
    resetDatabase();
  }, []);

  asyncCall();

  return (
    <>
      <p>Hello World!</p>
      {redirectNow ? (
        <Route exact path="/refresh">
          <Redirect to="/orders" />
        </Route>
      ) : (
        <></>
      )}
      {/* <Route exact path="/refresh">
        <Redirect to="/orders" />
      </Route> */}
    </>
  );
};

export default Refresh;
