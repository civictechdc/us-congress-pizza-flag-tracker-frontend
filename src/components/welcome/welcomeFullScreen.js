import React from "react";
import Carousel from "./carousel";
import WelcomeText from "./welcomeText";
import styles from "../../style/welcome.module.css";

const WelcomeFullScreen = (props) => {
  const { mediaQuery } = props;

  return (
    <div className={styles.welcomeBody}>
      <Carousel mediaQuery={mediaQuery} />
      <WelcomeText />
    </div>
  );
};

export default WelcomeFullScreen;
