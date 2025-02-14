import React, { useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

import { SignIn, SignUp, UserButton, useUser } from "@clerk/clerk-react";

import { ShopContext } from "../../Context/ShopContext";

function Navbar() {
  const { isSignedIn, user } = useUser();

  const { getTotalCartItems } = useContext(ShopContext);

  return (

    





    <nav
      class="navbar bg-dark border-bottom border-body fixed-top"
      data-bs-theme="dark"
    >
      <div class="container-fluid">
        <div className="navbar-logo">
          <Link to="/">
            <a class="navbar-brand">GLITCH STORE</a>
          </Link>
        </div>

        <div className="cart-profile">
          <Link to="/cart">
            <button type="button" class="btn position-relative">
              <img
                src="https://img.icons8.com/ios7/200w/FFFFFF/shopping-cart.png"
                alt=""
              />
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {getTotalCartItems()}
              </span>
            </button>
          </Link>

          {/* <Link to='/cart'> <img  src="https://img.icons8.com/ios7/200w/FFFFFF/shopping-cart.png"  alt="" /></Link>   */}
          {isSignedIn ? (
            <Link to="/profile">
              <UserButton />
            </Link>
          ) : (
            <Link to="/login">
              <img src="https://openclipart.org/image/2000px/247319" alt="" />
            </Link>
          )}
        </div>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-link active" aria-current="page">
              Shop <Link to="/"></Link>
            </a>
            <a class="nav-link" href="women">
              Women <Link to="/women"></Link>
            </a>
            <a class="nav-link" href="men">
              Men <Link to="/men"></Link>
            </a>
            <a class="nav-link" href="kids">
              Kids <Link to="/kids"></Link>
            </a>
            {isSignedIn ? (
              <a class="nav-link" href="profile">
                Account <Link to="/profile"></Link>
              </a>
            ) : null}
          </div>
          <form class="d-flex mt-3" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-light" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
      
    </nav>
  );
}

export default Navbar;
