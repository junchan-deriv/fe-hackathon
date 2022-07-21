import React from "react";
import { CoinListContext } from "../../components/coinList";
import DropDownList from "../../components/drop_down_list";
import MarketTable from "../../components/market_table";
import TopHighlight from "../../components/top_highlight";
import "../../scss/market.scss";

export default function Market() {
  const [crypto, setCrypto] = React.useState<string>("bitcoin");
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

        <DropDownList
          list={React.useContext(CoinListContext)}
          value={crypto}
          onChange={(e) => setCrypto(e.currentTarget.value)}
        />
        {/* here is the crypto data shown in table form */}
        <div className="table-container">
          <MarketTable coin={crypto} />
        </div>
      </div>
    </>
  );
}
