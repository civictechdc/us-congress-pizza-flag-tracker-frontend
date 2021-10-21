import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import devAuth from "./Authenticate"

function PrivateRoute ({ children, ...rest }) {
    
   return (
     <Route {...rest} render={ () => {
         return ( devAuth.isAuthenticated === true
            ? children
            :<Redirect to="/login"/>)
         
     }} />
   )
}

export default PrivateRoute;