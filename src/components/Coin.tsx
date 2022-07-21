import React from "react";
import "../scss/market.scss";
import { Link } from "react-router-dom";

const Coin = ({ coin }: any) => {
  return (
    <Link
      to={`/chart/${coin.id}/myr`}
      style={{
        textDecoration: "none",
        color: "black",
      }}
    >
      <div className="coinList-item">
        <img src={coin.image} alt="" className="coinListImg" />
        <span className="coin-symbol">{coin.symbol}</span>
        <span className="coin-price">$ &nbsp;{coin.current_price}</span>
      </div>
    </Link>
  );
};

export default Coin;
