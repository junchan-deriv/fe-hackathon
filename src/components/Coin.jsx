import React from "react";
import { Link } from "react-router-dom";
import "../scss/market.scss";

const Coin = ({ coin }) => {
  return (
    <li className="coinList-item">
      <img src={coin.image} alt="" className="coinListImg" />
      <span className="coin-symbol">{coin.symbol}</span>
      <span className="coin-price">$ &nbsp;{coin.current_price}</span>
    </li>
  );
};

export default Coin;
