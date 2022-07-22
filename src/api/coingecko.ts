import {
  coingecko_chart_data,
  coingecko_coin_entries,
  coingecko_market_data,
  coingecko_market_data_single_pair,
  coingecko_price_chart_data,
  coingecko_vs_currencies,
} from "../definitions/coingecko";
import { fetchJson } from "./fetchBase";

/**
 * The base url for the api
 */
const baseURL = "https://api.coingecko.com/api/v3";

/**
 * Query the list of supported currencies to be paired against
 * @returns list of supported vs currencies
 */
export function coingecko_get_supported_vs_currencies(): Promise<coingecko_vs_currencies> {
  return fetchJson<coingecko_vs_currencies>(
    `${baseURL}/simple/supported_vs_currencies`
  );
}

const knownList = ["doge"];
/**
 * Query the list of supported currencies
 * @returns list of the supported currencies
 */
export async function coingecko_get_supported_coins(): Promise<coingecko_coin_entries> {
  let data = await fetchJson<coingecko_coin_entries>(
    `${baseURL}/coins/list?include_platfrom=false`
  );
  let vs = await coingecko_get_supported_vs_currencies();
  data = data.filter(
    (z) => vs.includes(z.symbol) || knownList.includes(z.symbol)
  );
  data.sort((a, b) => a.symbol.localeCompare(b.symbol));
  return data;
}

/**
 * Get the current market data for the given coin
 * @param coin coin to get the data
 * @returns the market data for the coin
 */
export function coingecko_get_coin_current_data(
  coin: string
): Promise<coingecko_market_data> {
  return fetchJson<coingecko_market_data>(
    `${baseURL}/coins/${coin}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`,
    {
      cache: "no-store",
    }
  );
}

/**
 * Get the chart data
 * @param coin the coin to served as base currency
 * @param vs the currency to be forked from
 * @returns the chart data
 */
export function coingecko_get_chart_data(
  coin: string,
  vs: string
): Promise<coingecko_price_chart_data> {
  return fetchJson<coingecko_price_chart_data>(
    `${baseURL}/coins/${coin}/market_chart?vs_currency=${vs}&days=1`,
    {
      cache: "no-store",
    }
  );
}

/**
 * Return the market data of the coins against one currency
 * @param coin array holding the coins
 * @param vs the currency to compare against
 * @returns the array of the market data
 */
export function coingecko_get_market_data(
  coin: string[],
  vs: string
): Promise<coingecko_market_data_single_pair[]> {
  return fetchJson<coingecko_market_data_single_pair[]>(
    `${baseURL}/coins/markets?ids=${coin.join(",")}&vs_currency=${vs}`
  );
}

/**
 * This class serves as a simple tools to poll the endpoint about the data
 */
export class CoingeckoChartDataPoller {
  /**
   * the coin that the api is polling
   */
  coin: string = "";
  /**
   * the currency pair
   */
  vs: string = "";
  tickId: unknown = 0;
  /**
   * last 100 data points of the data loaded
   */
  chartData: coingecko_chart_data = [];
  /**
   * is the data is loading
   */
  processing: boolean = false;
  /**
   * called when error happened
   */
  onError?: (e: any) => void;
  /**
   * called when initial load completed
   */
  onLoad?: (self: CoingeckoChartDataPoller) => void;
  /**
   * called when new data point is there
   */
  onNewData?: (
    self: CoingeckoChartDataPoller,
    newSegment: coingecko_chart_data
  ) => void;
  constructor(coin: string, vs: string) {
    this.coin = coin;
    this.vs = vs;
  }
  /**
   * Start ticking
   */
  start() {
    this.load();
    //15sec
    this.tickId = setInterval(this.load.bind(this), 15000);
  }
  stop() {
    clearInterval(this.tickId as number);
    this.tickId = undefined;
  }
  /**
   * Internal function to load the stuffs
   */
  async load() {
    if (this.processing) return;
    this.processing = true;
    try {
      let data = await coingecko_get_chart_data(this.coin, this.vs);
      if (this.chartData.length === 0) {
        //chart is empty
        //lets first init it
        const baseIndex = Math.max(0, data.prices.length - 100);
        this.chartData = data.prices.slice(baseIndex, baseIndex + 100);
        //then fire the update event
        this.onLoad?.(this);
      } else {
        //the data is there, just we got new part
        //first get the first index where the data should be merged
        let i: number = data.prices.length - 1;
        for (; i >= 0; i--) {
          //get the entry
          let rhs = data.prices[i];
          let lhs = this.chartData[this.chartData.length - 1];
          if (rhs[0] <= lhs[0]) {
            break;
          }
        }
        if (i < 0) {
          //the stuffs is broken lets reset
          const baseIndex = Math.max(0, data.prices.length - 100);
          this.chartData = data.prices.slice(baseIndex, baseIndex + 100);
          //then fire the update event
          this.onLoad?.(this);
        } else {
          //if the point is found lets merge it
          //check the difference
          let datas = data.prices.slice(i + 1);
          //pop the starts
          this.chartData.splice(0, datas.length);
          //add the difference
          this.chartData.push(...datas);
          if (datas.length > 0) {
            //fire the new data
            this.onNewData?.(this, datas);
          }
        }
      }
    } catch (e) {
      console.error(e);
      this.onError?.(e);
    } finally {
      this.processing = false;
    }
  }
}
