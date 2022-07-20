import React from "react";
import Footer from "../footer/footer";
import Header from "../header/header";
import "./homepage.css";
import pic from "./Assets/TA Traders.png";
import foto from "./Assets/Crypto.png";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex-container">
        <div className="left-side-wordings">
          <p className="homepage">
            Fast, efficient and reliable cryptocurrency information
          </p>
          <h1 className="homepage">
            Discover your favourite
            <br />
            cryptocurrency
            <br />
            exchange
          </h1>
          <a className="button-68" href="#" role="button">
            Get Now
          </a>
          <p className="homepage-description">
            Trade with over 15 different crytocurrency exchange
            <br /> including Bitcoin, Ethereum and BNB pairs
          </p>
        </div>
        <div className="right-side-image">
          <img className="traders" src={pic} alt="" />
          <img className="crypto" src={foto} alt="" />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
