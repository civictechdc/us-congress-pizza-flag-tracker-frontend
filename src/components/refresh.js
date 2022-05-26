import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

const Refresh = (props) => {
  const resetDatabase = () => {
    // some code that talks to the server
  };

  useEffect(() => {
    // resetDatabase();
  }, []);

  return (
    <>
      <p>Hello World!</p>

      {/* <Route>
        <Redirect to="/login"/>

      </Route> */}

      {/* <UserRoute exact path={["/", "/orders"]} component={OrdersList} /> */}
    </>
  );
};

export default Refresh;
