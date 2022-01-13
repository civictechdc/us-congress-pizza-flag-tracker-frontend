import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isFed } from './Permissions';

function FedRoute ({ component: Component, ...rest }) {

   
   
   return (
     <Route {...rest} render={ (props) => {
         return ( isFed() 
            ? <Component {...props}/>
            :<Redirect to="/login"/>)
         
     }} />
   )
}

export default FedRoute;