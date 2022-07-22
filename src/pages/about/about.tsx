import React from "react";
import "../../scss/about.scss";
import logo from "./Assets/TradeNow.png";
import vyi from "./Assets/Vern Yi.jpg";
import jjj from "./Assets/JJ.jpg";
import afq from "./Assets/afiq.png";

export default function About() {
  return (
    <div className="body">
      <div className="trade-now-main">
        <div className="left-container">
          <h1 className="h1-low-opacity">About</h1>
          <h1 className="h1-about-us">About Trade Now</h1>
          {/* <p className="p-about-us">The best platform for cryptocurrency</p> */}
        </div>

        <div className="right-side-container">
          <img src={logo} alt="Trade Now logo" className="trade-now-logo" />
        </div>
      </div>
      <div className="trade-now-history">
        <p className="trade-now-history">
          TradeNow makes it accessible and easy to learn crypto. We’re on a
          mission to spread the word about this opportunity to create more
          financial growth for Malaysians. We are regulated by the Securities
          Commission Malaysia and comply with all local rules.
          <br />
          <br /> We’re here for all your questions, whether you’re just
          exploring the idea of investing or you’re more experienced. So far,
          more than 10 million people have chosen to invest in crypto with
          TradeNow. We’re in it for the long term and we invite you on this
          journey with us.{" "}
        </p>
      </div>
      <div>
        <div className="team-Trade-Now">
          <h2>Team Members</h2>
        </div>
        <div className="team-picture">
          <div>
            <img src={jjj} alt="Jia Jun" />
            <h3>Jia Jun</h3>
          </div>
          <div>
            <img src={vyi} alt="Vern Yi" />
            <h3>Vern Yi</h3>
          </div>
          <div>
            <img src={afq} alt="Afiq" />
            <h3>Afiq Salleh</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
