import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
// https://github.com/maxmarinich/react-alice-carousel
import styles from "../style/carousel.module.css";

import office from "../components/images/Capitol-Flag-Office-800x450.jpg";
import officeMedium from "../components/images/Capitol-Flag-Office-500x281.jpg";
import officeSmall from "../components/images/Capitol-Flag-Office-280x157.jpg";
import zoomIn from "../components/images/STOCap-05-800x450.jpg";
import zoomInMedium from "../components/images/STOCap-05-500x281.jpg";
import zoomInSmall from "../components/images/STOCap-05-280x157.jpg";
import zoomOut from "../components/images/STOCap-02-800x450.jpg";
import zoomOutMedium from "../components/images/STOCap-02-500x281.jpg";
import zoomOutSmall from "../components/images/STOCap-02-280x157.jpg";

import coverPanel from "../components/images/coverPanel.png";

const handleDragStart = (e) => e.preventDefault();

const large = [
  <img src={zoomOut} onDragStart={handleDragStart} role="presentation" />,
  <img src={zoomIn} onDragStart={handleDragStart} role="presentation" />,
  <img src={office} onDragStart={handleDragStart} role="presentation" />,
];

const medium = [
  <img src={zoomOutMedium} onDragStart={handleDragStart} role="presentation" />,
  <img src={zoomInMedium} onDragStart={handleDragStart} role="presentation" />,
  <img src={officeMedium} onDragStart={handleDragStart} role="presentation" />,
];

const small = [
  <img src={zoomOutSmall} onDragStart={handleDragStart} role="presentation" />,
  <img src={zoomInSmall} onDragStart={handleDragStart} role="presentation" />,
  <img src={officeSmall} onDragStart={handleDragStart} role="presentation" />,
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

  let items = large;
  let buffer = (mediaQuery - 800) / 2;

  if (mediaQuery < 800) {
    items = medium;
    buffer = (mediaQuery - 500) / 2;
  }

  if (mediaQuery < 500) {
    items = small;
    buffer = (mediaQuery - 280) / 2;
  }

  if (buffer < 1) {
    buffer = 0;
  }

  return (
    <section className={styles.carouselContainer}>
      <img
        className={styles.coverPanelLeft}
        src={coverPanel}
        // covers odd edge carousel artifact edge cases
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
        className={styles.coverPanelRight}
        src={coverPanel}
        // covers odd edge carousel artifact edge cases
      />
    </section>
  );
};

export default Carousel;
