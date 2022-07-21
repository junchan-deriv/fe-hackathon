import React, { useContext, useEffect, useState } from "react";
import coinGecko from "../api/coinGecko";
import Coin from "./Coin";
import { CoinListContext } from "./coinList";
import "../scss/market.scss";

export default function TopHighlight() {
  const [coin, setCoin] = useState<any>([]);
  const coinList = useContext(CoinListContext);
  const [loading, setLoading] = useState(false);
  console.log(coinList);
  useEffect(() => {
    // get the coin data
    const getCoinData = async () => {
      setLoading(true);
      const result = await coinGecko.get("/coins/markets/", {
        params: {
          vs_currency: "myr",
          ids: coinList.join(","),
        },
      });
      console.log(result.data);
      setCoin(result.data);
      setLoading(false);
    };

    getCoinData();
  }, [coinList]);

  const renderCoin = () => {
    if (loading) {
      return <div>Loading.....</div>;
    }

    return (
      <div className="coin-list">
        {coin.map((coin: any) => {
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
