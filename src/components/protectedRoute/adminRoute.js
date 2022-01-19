import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { adminControl } from './permissions';


function AdminRoute ({ component: Component, ...rest }) {

  //const history = useHistory()
  
 
    
   return (
     <Route {...rest} render={ (props) => {
         return ( adminControl() 
            ? <Component {...props}/>
            :<Redirect to="/login"/>)
         
     }} />
   )
}

export default AdminRoute;