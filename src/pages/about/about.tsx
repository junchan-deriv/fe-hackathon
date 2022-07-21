import React from "react";
import "./about.css";
import logo from "./Assets/TradeNow.png";

export default function About() {
  return (
    <div className="body">
      <div className="trade-now-main">
        <h1 className="h1-low-opacity">About</h1>
        <h1 className="h1-about-us">About Trade Now</h1>
        {/* <p className="p-about-us">The best platform for cryptocurrency</p> */}
        <img
          src={logo}
          alt="Trade Now logo"
          className="trade-now-logo mask-logo"
        />
      </div>
      <div className="trade-now-history">
        <p className="trade-now-history">
          TradeNow makes it accessible and easy to learn crypto. We’re on a
          mission to spread the word about this opportunity to create more
          financial growth for Malaysians.
          <br />
          <br /> We are regulated by the Securities Commission Malaysia and
          comply with all local rules. We’re here for all your questions,
          whether you’re just exploring the idea of investing or you’re more
          experienced. <br />
          <br /> So far, more than 10 million people have chosen to invest in
          crypto with TradeNow. We’re in it for the long term and we invite you
          on this journey with us.{" "}
        </p>
      </div>
      <div className="team-Trade-Now">
        <div className="JiaJun">
          Jia Jun
          <img src="" alt="" />
        </div>
        <div className="VernYi">Vern Yi</div>
        <div className="Afiq">Afiq Salleh</div>
      </div>
    </div>
  );
}
