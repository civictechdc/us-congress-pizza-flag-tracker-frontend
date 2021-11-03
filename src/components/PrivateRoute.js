import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import devAuth from "./Authenticate"

function PrivateRoute ({ children, ...rest }) {

  const user = JSON.parse(localStorage.getItem("user"));
    
   return (
     <Route {...rest} render={ () => {
         return ( user && user.accessToken
            ? children
            :<Redirect to="/login"/>)
         
     }} />
   )
}

export default PrivateRoute;