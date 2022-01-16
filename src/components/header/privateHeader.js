import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/authService";


function Privateheader(params) {

    
    
  function logOut() {
    AuthService.logout();
  }

    return(
        <>
          <header> 
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <a href="/orders" className="navbar-brand">
                Flagpizza
              </a>
              <div className="navbar-nav mr-auto public-header">
                <li className="nav-item">
                  <Link to={"/orders"} className="nav-link">
                    Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/add"} className="nav-link">
                    Add
                  </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/profile"} className="nav-link">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/users/add"} className="nav-link">
                      Add User
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={logOut}>
                      Log Out
                    </a>
                  </li>
                  <li className="nav-item">
                    <p className="nav-link">{AuthService.getCurrentUserName()}</p>
                  </li>
              </div>
              
            </nav>
          </header>
        </>
    )
}

export default Privateheader;