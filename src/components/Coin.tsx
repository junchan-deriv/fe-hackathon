import React from "react";
import "../scss/market.scss";
import { Link } from "react-router-dom";
import { coingecko_market_data_single_pair } from "../definitions/coingecko";

type CoinProps = {
  coin: coingecko_market_data_single_pair;
};

const Coin = ({ coin }: CoinProps) => {
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
        <span className="coin-symbol">{coin.symbol.toUpperCase()}</span>
        <span className="coin-price">RM {coin.current_price}</span>
      </div>
    </Link>
  );
};

export default Coin;
