import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "../style/carousel.module.css";

import flag from "../components/images/us-capitol-flag-6240878.jpg";

const handleDragStart = (e) => e.preventDefault();

const items = [
  <img src={flag} onDragStart={handleDragStart} role="presentation" />,
  <img src={flag} onDragStart={handleDragStart} role="presentation" />,
  <img src={flag} onDragStart={handleDragStart} role="presentation" />,
];

const Carousel = () => {
  return (
    <AliceCarousel
      infinite
      keyboardNavigation
      paddingLeft={50}
      mouseTracking
      items={items}
    />
  );
};

export default Carousel;
