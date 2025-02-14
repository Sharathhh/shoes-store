import { SignIn, useUser } from "@clerk/clerk-react";
import React, { useContext, useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import "../Pages/CSS/MyOrder.css";

function MyOrder() {
  const { all_product } = useContext(ShopContext);
  const { isSignedIn, user } = useUser();
  const location = useLocation();
  const savedOrder = location.state?.savedOrder;

  const [orderState, setOrderState] = useState([]);

  const navigate= useNavigate();
  useEffect(() => {
    if (user) {
      let userId = user.id;
      console.log("UserData:", userId);

      fetch("http://localhost:4000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          setOrderState(data); 
        })
        .catch((err) => console.log("Error fetching orders:", err));
    } else {
      console.log("User not logged in");
    }
  }, [user]);

  return (
    <div className="myorder">
      <h1 className="text-center mt-5 mb-5">My Orders</h1>

      {orderState.length > 0 ? (
        <div>
          <div className="order-header">
            <p className="fw-bold">Products</p>
            <p className="fw-bold">Product Name</p>
            <p className="fw-bold">Price</p>
            <p className="fw-bold">Delivery Date</p>
            <p className="fw-bold">Status</p>
            <p class='fw-bold'>Receipt</p>
          </div>

          {orderState.map((order) => {
            let dates = order.Date ? order.Date.slice(0, 10) : "N/A";
            if (dates.length === 10) {
              let lastDigit = Number(dates.charAt(9)) + 4;
              dates = dates.slice(0, 9) + lastDigit;
            }

            return all_product
              .filter((e) => order.cartItems[e.id] > 0)
              .map((e) => (
                <div key={`${order._id}-${e.id}`} className="order-container">
                  <hr />
                  <div className="order-details">
                    <img src={e.image} className="order-img" alt={e.name} />
                    <p>{e.name}</p>
                    <p>${e.new_price}</p>
                    <p>Delivery Expected By: {dates}</p>
                    <p>Ordered</p>
                    <button onClick={()=>navigate(`/receipt/${e._id}`, {state: order})}>Download Now</button>
                  </div>
                </div>
              ));
          })}
        </div>
      ) : (
        <div>No Orders</div>
      )}
    </div>
  );
}

export default MyOrder;
