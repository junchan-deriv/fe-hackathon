import React from "react";
import { Link } from "react-router-dom";

const Coin = ({ coin }) => {
  return (
    <Link to="/chart">
      <li className="coinList-item">
        <img src={coin.image} alt="" className="coinListImg" />
        <span className="coin-price">{coin.current_price}</span>
      </li>
    </Link>
  );
};

export default Coin;
