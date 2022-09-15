import React, { useEffect, useState } from "react";
import WelcomeMobile from "../components/welcome/welcomeMobile";
import WelcomeFullScreen from "../components/welcome/welcomeFullScreen";
import Carousel from "../components/welcome/carousel";
import styles from "../style/welcome.module.css";

const Welcome = () => {
  const [mediaQuery, setMediaQuery] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setMediaQuery(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <>
      {mediaQuery < 800 ? (
        <WelcomeMobile mediaQuery={mediaQuery} />
      ) : (
        <WelcomeFullScreen mediaQuery={mediaQuery} />
      )}
    </>
  );
};

export default Welcome;
