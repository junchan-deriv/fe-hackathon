import React from "react";
import { Link } from "react-router-dom";
import "../../scss/header.scss";

function Header() {
  const path = document.location.pathname;
  console.log("this is nav");
  return (
    /* Navigation Menu */
    <>
      <nav className="nav">
        <div className="site-title">
          <img
            className="logo"
            src="/image/TradeNow.png"
            alt="trade-now-logo"
          />
          <h4>TradeNow</h4>
        </div>
        <div className="nav-list">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/market">Market</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;
