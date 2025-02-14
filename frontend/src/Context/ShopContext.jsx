import { useAuth } from "@clerk/clerk-react";
import { createContext, useState } from "react";
import './loadingAnimation.css'
import { useEffect } from "react";
import { data } from "react-router-dom";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 200; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const { userId, isSignedIn } = useAuth();

  const [all_product, setAllproducts] = useState([]);

  const [cartItems, setCartItems] = useState(getDefaultCart());

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => setAllproducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    setLoading(false);
    if (isSignedIn && userId) {
      // ✅ Only fetch if the user is signed in and userId is available
      try {
        fetch(`http://localhost:4000/getcart`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Cart data received:", data); // ✅ Proper logging
            setCartItems(data); // ✅ Update state
            setLoading(false);
          })
          .catch((error) => console.error("Error fetching cart items:", error)); // ✅ Proper error handling
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setLoading(false);
      }
    }
  }, [isSignedIn, userId]);

  const addToCart = async (itemId) => {
    if (!userId) {
      console.error("User not logged in, cannot add to cart");
      return;
    }

    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    try {
      setLoading(false);
      const response = await fetch(
        "http://localhost:4000/addtocart",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemId, userId }),
        },
        []
      )
        .then((response) => response.json())
        .then((data) => console.log(data));
      setLoading(false);
    } catch (error) {
      console.log("Error adding to cart", error);
      setLoading(false);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    try {
      const response = fetch("http://localhost:4000/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId, userId }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Removed", data));
      setLoading(false);
    } catch (error) {
      console.log("Error in removing:", error);
      setLoading(false);
    }
  };

  const getTotalCartAmount = () => {
    setLoading(true);
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let iteminfo = all_product.find(
          (product) => product.id == Number(item)
        );
        totalAmount += iteminfo.new_price * cartItems[item];
      }
    }
    setLoading(false);
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    setLoading(false);
    return totalItem;
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };
  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
