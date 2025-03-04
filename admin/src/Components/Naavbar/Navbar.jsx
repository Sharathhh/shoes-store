import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="alt-navbar">
      <div className="alt-navbar-container">
        <div className="alt-navbar-brand">
          <Link to="/">GLITCH STORE</Link>
        </div>
        <nav className={`alt-navbar-nav ${menuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <Link to="/" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/admin/addproduct" onClick={toggleMenu}>
                Add Product
              </Link>
            </li>
            <li>
              <Link to="/admin/listproduct" onClick={toggleMenu}>
                All Products
              </Link>
            </li>
            <li>
              <Link to="/admin/allorders" onClick={toggleMenu}>
                All Orders
              </Link>
            </li>
          </ul>
        </nav>
        <div className="alt-navbar-toggle" onClick={toggleMenu}>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
