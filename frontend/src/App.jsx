import "./App.css";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignUp from "./Pages/LoginSignUp";
import men_banner from "./assets/banner_mens.png";
import woman_banner from "./assets/banner_women.png";
import kid_banner from "./assets/banner_kids.png";
import Profile from "./Pages/Profile";
import Payment from "./Pages/Payment";
import Footer from "./Components/Footer/Footer";
import SavetoDB from "./Pages/SavetoDB";
import Checkout from "./Pages/Checkout";
import OrderSuccess from "./Pages/OrderSuccess";
import MyOrder from "./Pages/MyOrder";
import ReceiptPage from "./Pages/ReceiptPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<><Shop /><SignedIn> <SavetoDB/></SignedIn>
            </>} />
        <Route path="/men" element={<ShopCategory banner={men_banner} category="men" />} />
        <Route path="/women" element={<ShopCategory banner={woman_banner} category="women" />} />
        <Route path="/kids" element={<ShopCategory banner={kid_banner} category="kid" />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/razorpay-checkout" element={<Payment/>}/>
        <Route path="/order-success" element={<OrderSuccess/>}/>
        <Route path="/myorders" element={<MyOrder/>}/>
        <Route path="/receipt/:orderId" element={<ReceiptPage/>}/>

      </Routes>
      <Footer/>
          </BrowserRouter>
  );
}

export default App;
