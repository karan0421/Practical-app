import React from "react";
import Slider from "react-slick";

const ImageCarousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div style={{ maxWidth: "80%",maxHeight:"100%", margin: "0 auto" }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Slide ${index}`}
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
