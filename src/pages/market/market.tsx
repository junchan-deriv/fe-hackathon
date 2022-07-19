import React from "react";
import MarketTable from "../../components/market_table";
import "../../scss/market.scss";

export default function Market() {
  return (
    <div className="container">
      {/* here is the highlight container for users to view the top coin rate */}
      <div className="hightlight">
        {/* hightlight title */}
        <div className="hightlight-title">
          <h4>Market</h4>
        </div>

        <div className="hightlight-container">
          <div className="top-coin">
            {/* here is the get the bitcoin latest news(name,symbol,price) */}
          </div>

          <div className="lowest-coin">
            {/* here is the get the doge coin latest news(name,symbol,price) */}
          </div>
        </div>
      </div>

      {/* here is the crypto data shown in table form */}
      <div className="table-container">
        <MarketTable coin="dogecoin" />
      </div>
    </div>
  );
}
