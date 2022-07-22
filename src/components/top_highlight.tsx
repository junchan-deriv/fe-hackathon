import React, { useContext } from "react";
import Coin from "./Coin";
import { CoinListContext } from "./coinList";
import "../scss/market.scss";
import { coingecko_market_data_single_pair } from "../definitions/coingecko";
import { coingecko_get_market_data } from "../api/coingecko";
import { useInterval } from "../utils/reactHooks";

export default function TopHighlight() {
  const coinList = useContext(CoinListContext);
  const coin = useInterval<coingecko_market_data_single_pair[]>(
    coingecko_get_market_data.bind(null, coinList, "myr"),
    15000
  );

  const renderCoin = () => {
    if (!coin) {
      return <div>Loading.....</div>;
    }

    return (
      <div className="coin-list">
        {coin.map((coin: coingecko_market_data_single_pair) => {
          return <Coin key={coin.id} coin={coin} />;
        })}
      </div>
    );
  };

  return (
    <div className="content">
      <h1 className="title">Highlight Coin</h1>
      <div className="description">
        <div className="card">{renderCoin()}</div>
      </div>
    </div>
  );
}
