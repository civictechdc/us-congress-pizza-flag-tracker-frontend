import React from "react";
import { Link } from "react-router-dom";
import styles from "../../style/navbar.module.css";
import AuthService from "../../service/authService";
import { orderControl, adminControl } from "../protectedRoute/permissions";

function Privateheader(params) {
  function logOut() {
    AuthService.logout();
    window.location.reload();
  }

  return (
    <>
      <nav className={styles.nav_container}>
        <div className={styles.nav_group1}>
          <h1 className={styles.nav_title}>
            <Link to={"/welcome"} style={{ color: "#000" }}>
              Flagpizza
            </Link>
          </h1>
          <li>
            <Link to={"/"} className={styles.nav_item}>
              Orders
            </Link>
          </li>

          {orderControl() ? (
            <li>
              <Link to={"/add"} className={styles.nav_item}>
                Add
              </Link>
            </li>
          ) : (
            <div></div>
          )}

          <li>
            <Link to={"/profile"} className={styles.nav_item}>
              Profile
            </Link>
          </li>
          {adminControl() ? (
            <li>
              <Link to={"/users/add"} className={styles.nav_item}>
                Add User
              </Link>
            </li>
          ) : (
            <div></div>
          )}
        </div>
        <div className={styles.nav_group2}>
          <li>
            <Link to={"/login"} onClick={logOut} className={styles.nav_logout}>
              Log Out
            </Link>
          </li>
          <li className={styles.nav_username}>
            <p>{AuthService.getCurrentUserName()}</p>
          </li>
        </div>
      </nav>
    </>
  );
}

export default Privateheader;
