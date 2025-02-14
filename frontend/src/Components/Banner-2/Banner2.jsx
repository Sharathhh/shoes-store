import React from "react";
import "../Banner-2/Banner2.css";
import Banner_2 from "../../assets/Banner2.png";
import ShopCategory from "../../Pages/ShopCategory";
import { Link } from "react-router-dom";
function Banner2() {
  return (
    <div className="banner">
      <h1 >Timeless Style. Modern Fit</h1>
      <p>"New season, new wardrobe – shop the latest trends now!"</p>
      <div className="inner-banner">
        <p>Shopper Exlusive</p>
        <Link to="/men">
          <button>SHOP NOW</button>
        </Link>
        <img src={Banner_2} alt="" />
      </div>
    </div>
  );
}

export default Banner2;
