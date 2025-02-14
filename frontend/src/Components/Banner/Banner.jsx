import React from "react";
import Banner1 from "../../assets/Banner1.jpg";
import "./Banner.css";
function Banner() {
  return (
    <div className="banner">
      <div className="inner-banner">
        <img src={Banner1} alt="" />
      </div>
    </div>
  );
}

export default Banner;
