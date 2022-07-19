import React from "react";
import { Link } from "react-router-dom";
import "../header.css";

function Header() {
  const path = window.location.pathname;
  return (
    <>
      console.log("this is nav");
      <nav className="nav">
        <div className="site-title">
          <img src="tmr download from drive.png" alt="trade-now-logo" />
          <h4>TradeNow</h4>
        </div>
        <ul>
          <li>
            <a href="/market">Market</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
