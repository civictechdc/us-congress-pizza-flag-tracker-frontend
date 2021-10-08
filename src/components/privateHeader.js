import React from "react";
import { Link } from "react-router-dom";

function Privateheader(params) {
  return (
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
            <li className="nav-link">Logout</li>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Privateheader;
