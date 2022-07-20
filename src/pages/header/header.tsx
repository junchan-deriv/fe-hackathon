import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "../../scss/header.scss";

function Header() {
  console.log("this is nav");
  return (
    /* Navigation Menu */
    <>
      <nav className="nav">
        <Link to="/" className="site-title">
          <img
            className="logo"
            src="/image/TradeNow.png"
            alt="trade-now-logo"
          />
          <h4>TradeNow</h4>
        </Link>
        <div className="nav-list">
          {/* Links for nav */}
          <ul>
            <NavLinks to="/">Home</NavLinks>
            <NavLinks to="/market">Market</NavLinks>
            <NavLinks to="/about">About</NavLinks>
          </ul>
        </div>
      </nav>
    </>
  );
}

type NavLinksProps = {
  to: string;
  children: React.ReactNode;
};
function NavLinks({ to, children }: NavLinksProps) {
  // const path = document.location.pathname;
  const resolvedPath = useResolvedPath(to);
  // the end check the entire path is the excatly same or not
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to}>{children}</Link>
    </li>
  );
}

export default Header;
