import React from "react";
import Carousel from "react-material-ui-carousel";
import "./Carousel.css";
import image1 from "../../Assets/carousel/image1.png";
import image2 from "../../Assets/carousel/image2.png";
import image3 from "../../Assets/carousel/image3.png";
import image4 from "../../Assets/carousel/image4.png";

const CustomCarousel = () => {
  return (
    <div className="banner">
      <Carousel className="new">
        <img src={image1} className="bgImg" alt="Family" />
        <img src={image2} className="bgImg" alt="Shopping background 1" />
        <img src={image3} className="bgImg" alt="Shopping background 2" />
        <img src={image4} className="bgImg" alt="Shopping background 3" />
      </Carousel>
    </div>
  );
};

export default CustomCarousel;
