import React from "react";
import { coingecko_get_coin_current_data } from "../api/coingecko";
import {
  coingecko_coin_kv,
  coingecko_market_data,
} from "../definitions/coingecko";
import { useInterval } from "../utils/reactHooks";
import "../scss/market_table.scss";

type MarketTableProps = {
  coin: string;
  vs_currencies?: string[];
};

type coingecko_market_data_render = coingecko_market_data & {
  diff?: coingecko_coin_kv;
};

/**
 * Component to show the table of the prices
 */
export default function MarketTable({ coin, vs_currencies }: MarketTableProps) {
  //page number
  const [page, setPage] = React.useState<number>(1);
  //get the data
  const currentMarketData = useInterval<coingecko_market_data_render>(
    () => coingecko_get_coin_current_data(coin),
    30000,
    [coin, vs_currencies],
    (updated, old) => {
      if (!updated) {
        return old;
      }
      //should we include this in calculations
      let process = (v: string) =>
        vs_currencies ? vs_currencies.includes(v) : true;
      //the currencies to perform diff on
      const currencies = Object.keys(updated.market_data.current_price).filter(
        process
      );
      if (old && old.id === updated.id) {
        //if the old data here perform the diff here
        currencies.forEach((k) => {
          updated.diff = updated.diff ?? {};
          let lhs = updated.market_data.current_price[k],
            rhs = old.market_data.current_price[k];
          if ("number" === typeof rhs && typeof lhs === "number") {
            updated.diff[k] = lhs - rhs;
          }
        });
      }
      return updated;
    }
  );
  //check weather the data is out of sync
  if (!currentMarketData || currentMarketData?.id !== coin) {
    //this test is required because the changes in prop sometimes
    //race condition where confuses the React
    return <>Loading</>;
  }
  //get the keys if there is no there
  vs_currencies =
    vs_currencies ??
    (currentMarketData
      ? Object.keys(currentMarketData.market_data.current_price)
      : undefined);
  // declare the start and end of table row range
  const startRange = (page - 1) * 10;
  const endRange = startRange + 10;
  return (
    <div>
      <table className="market_table">
        <thead>
          <tr>
            <th>Coin (Primary Currency)</th>
            <th>(Secondary Currency)</th>
            <th>Current price</th>
            <th>Changes 24h</th>
          </tr>
        </thead>
        <tbody>
          {vs_currencies &&
            vs_currencies
              .slice(startRange, endRange) //slice the table
              .map(
                (cur) =>
                  cur !== currentMarketData.symbol && (
                    <TableRow
                      key={cur}
                      coin={coin}
                      icon={currentMarketData.image.small}
                      vs={cur}
                      price={
                        currentMarketData.market_data.current_price[
                          cur
                        ] as number
                      }
                      diff={(currentMarketData?.diff ?? {})[cur]}
                      changes={
                        currentMarketData.market_data
                          .price_change_percentage_24h_in_currency[cur]
                      }
                    />
                  )
              )}
        </tbody>
      </table>
      {/* page button */}
      <div className="pagination">
        <button
          className="back-btn"
          disabled={1 === page} // if the page is 1, button disable
          onClick={() => {
            setPage(page - 1); // if button clicked, page num decreased
          }}
        >
          Back
        </button>
        {/* display current page number */}
        <span className="pageNo">{page}</span>
        <button
          className="next-btn"
          disabled={vs_currencies && page * 10 >= vs_currencies?.length} // if the array length is 0, next button disable
          onClick={() => {
            setPage(page + 1); // if button clicked, page num increased
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

type TableRowProp = {
  coin: string;
  icon: string;
  vs: string;
  price: number;
  changes?: number;
  diff?: number;
};

export function TableRow({
  coin,
  vs,
  price,
  changes,
  diff,
  icon,
}: TableRowProp) {
  const decideColor = () => {
    if (!diff) {
      return "";
    } else if (diff > 0) {
      return "rising";
    } else if (diff < 0) {
      return "losing";
    }
  };
  return (
    <>
      <tr>
        <td>
          <img className="icon" alt={coin} src={icon} />
          {coin}
        </td>
        <td>{vs}</td>
        <td>{price}</td>
        <td
          className={decideColor()}
          onAnimationEnd={(e) => e.currentTarget.setAttribute("class", "")}
        >
          <span className={!changes ? "" : changes > 0 ? "higher" : "lower"}>
            {changes ? changes.toFixed(2) + "%" : "unknown"}
          </span>
        </td>
      </tr>
    </>
  );
}
