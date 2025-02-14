import React from "react";
import "./Trending.css";
import data_product from "../../assets/data";
import Item from "../Item/Item";
import { useState } from "react";
import { useEffect } from "react";

function Trending() {
  const [latest_product, setlatest_product] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/latestproducts")
      .then((resp) => resp.json())
      .then((data) => setlatest_product(data));
  }, []);

  return (
    <div id="men" className="trending">
      <h1>Latest Arrivals</h1>
      <p>"Because great style never goes out of fashion"</p>
      <div className="trending-items">
        {latest_product.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              image={item.image}
              name={item.name}
              old_price={item.old_price}
              new_price={item.new_price}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Trending;
