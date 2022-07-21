import React from "react";
import DropDownList from "../../components/drop_down_list";
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
            <h2>Market Live Chart</h2>
            <div className="hightlight-container">
              <TopHighlight />
            </div>
          </div>
        </div>

        <DropDownList list={["bitcoin", "ethereum", "litecoin", "dogecoin"]} />
        {/* here is the crypto data shown in table form */}
        <div className="table-container">
          <MarketTable coin="bitcoin" />
        </div>
      </div>
    </>
  );
}
