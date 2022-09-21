import React, { useEffect, useState } from "react";

import AliceCarousel from "react-alice-carousel";
import "../../style/alice-carousel.css";
// https://github.com/maxmarinich/react-alice-carousel

import office from "../../components/images/Architect-of-the-Capital-office.jpg";
import zoomIn from "../../components/images/STOCap-05.jpg";
import zoomOut from "../../components/images/STOCap-02.jpg";

import coverPanel from "../../components/images/coverPanel.png";

const handleDragStart = (e) => e.preventDefault();

const items = [
  <img
    src={zoomOut}
    className="imgSize"
    onDragStart={handleDragStart}
    role="presentation"
  />,
  <img
    src={zoomIn}
    className="imgSize"
    onDragStart={handleDragStart}
    role="presentation"
  />,
  <img
    src={office}
    className="imgSize"
    onDragStart={handleDragStart}
    role="presentation"
  />,
];

const Carousel = () => {
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

  let buffer = 0;

  if (mediaQuery < 800) {
    buffer = mediaQuery * 0.05;
  }

  return (
    <section className="carouselContainer">
      <img
        className="coverPanelLeft"
        src={coverPanel}
        // covers odd carousel artifact edge cases
      />
      <AliceCarousel
        autoPlay
        autoPlayInterval={10000}
        autoPlayStrategy={"all"}
        disableButtonsControls
        infinite
        items={items}
        keyboardNavigation
        mouseTracking
        paddingLeft={buffer}
      />
      <img
        className="coverPanelRight"
        src={coverPanel}
        // covers odd carousel artifact edge cases
      />
    </section>
  );
};

export default Carousel;
