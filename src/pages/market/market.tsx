import React from "react";
import MarketTable from "../../components/market_table";
import TopHighlight from "../../components/top_highlight";
import "../../scss/market.scss";

export default function Market() {
  return (
    <>
      <div className="container">
        {/* here is the highlight container for users to view the top coin rate */}
        <div className="hightlight">
          {/* hightlight title */}
          <div className="hightlight-title">
            <h2>Market</h2>
            <div className="hightlight-container">
              <TopHighlight />
            </div>
          </div>
        </div>

        {/* here is the crypto data shown in table form */}
        <div className="table-container">
          <MarketTable coin="dogecoin" />
        </div>
      </div>
    </>
  );
}
