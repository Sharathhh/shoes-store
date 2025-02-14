import React, { useContext } from "react";
import { useLocation } from "react-router-dom";

import { useUser } from "@clerk/clerk-react";
import { ShopContext } from "../../Context/ShopContext";

import "./RazorpayPayment.css";
function RazorpayPayment() {
  const { user } = useUser();

  const location = useLocation();
  const formData = location.state?.formData || {};

  let name = formData.name;
  let address = formData.address;
  let phone = formData.phone;
  let paymentMethod = formData.paymentMethod;

  let userId = user.id;

  const { getTotalCartAmount, cartItems } = useContext(ShopContext);
  const amount = getTotalCartAmount() * 100;
  console.log(amount);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  var razorpay = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }

    const response = await fetch("http://localhost:4000/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency: "INR",
        cartItems,
        userId,
        name,
        address,
        phone,
        paymentMethod,
      }),
    });

    const order = await response.json();
    console.log(order);

    // Open Razorpay Checkout
    const options = {
      key: "rzp_test_hgBV9XH1SPFRJe", // Replace with your Razorpay key_id
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: order.currency,
      name: "Acme Corp",
      description: "Test Transaction",
      order_id: order.id, // This is the order_id created in the backend
      handler: function (response) {
        window.location.href = "/order-success"; // Your URL to which the customer is redirected after payment
      }, // Your success URL
      prefill: {
        name: name,
        email: `${name}@gmail.com`,
        contact: phone,
      },
      theme: {
        color: "#F37254",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="razorpay-container">
      <h1>Total Amount</h1>
      <p>${getTotalCartAmount()}</p>
      <div class="d-flex justify-content-center ">
        <button class="btn btn-primary" onClick={razorpay}>
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default RazorpayPayment;
