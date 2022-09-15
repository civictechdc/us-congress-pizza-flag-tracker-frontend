import React from "react";
import Carousel from "./carousel";
import WelcomeText from "./welcomeText";

const WelcomeMobile = (props) => {
  const { mediaQuery } = props;

  return (
    <>
      <Carousel mediaQuery={mediaQuery} />
      <WelcomeText />
    </>
  );
};

export default WelcomeMobile;
