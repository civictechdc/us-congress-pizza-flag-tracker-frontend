import React from "react";
import { Link } from "react-router-dom";



function Publicheader(params) {
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
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
          </li>
        </div>
      </nav>
    </header>
        </>
    )
}

export default Publicheader;