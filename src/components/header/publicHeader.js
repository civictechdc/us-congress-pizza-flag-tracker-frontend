import React from "react";
import { Link } from "react-router-dom";
import styles from "../../style/navbar.module.css";

function Publicheader(params) {
  return (
    <>
      <header>
        <nav className={styles.nav_conatiner}>
          <div className={styles.nav_group1}>
            <h1 className={styles.nav_title}>Flagpizza</h1>
            <li>
              <Link to={"/"} className={styles.nav_item}>
                Orders
              </Link>
            </li>
            <li>
              <Link to={"/login"} className={styles.nav_item}>
                Login
              </Link>
            </li>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Publicheader;
