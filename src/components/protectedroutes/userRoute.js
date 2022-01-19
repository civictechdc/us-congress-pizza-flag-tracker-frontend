import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import  { isUser } from './permissions';


function UserRoute ({ component: Component, ...rest }) {

  
    
   return (
     <Route {...rest} render={ (props) => {
         return ( isUser()
            ? <Component {...props}/>
            :<Redirect to="/login"/>)
         
     }} />
   )
}

export default UserRoute;