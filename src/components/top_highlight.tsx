import React, { useContext, useEffect, useState } from "react";
import coinGecko from "../api/coinGecko";
import Coin from "./Coin";
import { CoinListContext } from "./coinList";
import "../../scss/market.scss";

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
          vs_currency: "usd",
          ids: coinList.join(","),
        },
      });
      console.log(result.data);
      setCoin(result.data);
      setLoading(false);
    };

    getCoinData();
  }, []);

  const renderCoin = () => {
    if (loading) {
      return <div>Loading.....</div>;
    }

    return (
      <ul className="coin-list">
        {coin.map((coin: any) => {
          return <Coin key={coin.id} coin={coin} />;
        })}
      </ul>
    );
  };

  return (
    // <div></div>
    <div className="content">
      <h4 className="title">Highlight Coin</h4>
      <div className="description">
        <div className="card">{renderCoin()}</div>
      </div>
    </div>
  );
}
