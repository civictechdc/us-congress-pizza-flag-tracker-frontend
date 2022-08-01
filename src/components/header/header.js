import React, { useContext } from "react";

import { Link } from "react-router-dom";
import styles from "../../style/navbar.module.css";
import AuthService from "../../service/authService";
import { adminControl, isUser, orderControl } from "../permissions";
import UserContext from "../userContext";

function Header() {
  const { setUserDisplay } = useContext(UserContext); // rerenders when user logs in

  function logOut() {
    AuthService.logout();
    setUserDisplay();
  }

  return (
    <>
      <header>
        <nav className={styles.nav_container}>
          <div className={styles.nav_group1}>
            <h1 className={styles.nav_title}>
              <Link to={"/welcome"} style={{ color: "#000" }}>
                Flagpizza
              </Link>
            </h1>

            <li>
              <Link to={"/orders"} className={styles.nav_item}>
                Orders
              </Link>
            </li>

            {isUser() ? (
              <>
                {orderControl() ? (
                  <>
                    <li>
                      <Link to={"/add"} className={styles.nav_item}>
                        Add
                      </Link>
                    </li>
                  </>
                ) : (
                  <></>
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
                  <></>
                )}
              </>
            ) : (
              <li>
                <Link to={"/login"} className={styles.nav_item}>
                  Login
                </Link>
              </li>
            )}
          </div>
          {isUser() ? (
            <>
              <div className={styles.nav_group2}>
                <li>
                  <button onClick={logOut} className={"btn btn-success"}>
                    Log Out
                  </button>
                </li>

                <li className={styles.nav_username}>
                  <p>{AuthService.getCurrentUserName()}</p>
                </li>
              </div>
            </>
          ) : (
            <></>
          )}
        </nav>
      </header>
    </>
  );
}

export default Header;
