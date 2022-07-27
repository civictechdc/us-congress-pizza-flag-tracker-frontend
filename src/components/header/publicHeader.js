import React from "react";
import { Link } from "react-router-dom";
import styles from "../../style/navbar.module.css";

function Publicheader() {
  return (
    <>
      <header>
        <nav className={styles.nav_conatiner}>
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
