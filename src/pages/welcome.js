import React from "react";
import Carousel from "../components/welcome/carousel";
import WelcomeText from "../components/welcome/welcomeText";
import styles from "../style/welcome.module.css";

const Welcome = () => {
  return (
    <div className={styles.welcomeBody}>
      <Carousel />
      <WelcomeText />
    </div>
  );
};

export default Welcome;
