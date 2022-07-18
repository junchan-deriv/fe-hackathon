import {
  coingecko_coin_entries,
  coingecko_market_data,
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

/**
 * Query the list of supported currencies
 * @returns list of the supported currencies
 */
export function coingecko_get_supported_coins(): Promise<coingecko_coin_entries> {
  return fetchJson<coingecko_coin_entries>(`${baseURL}/coins/list`);
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
    `${baseURL}/coins/${coin}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`
  );
}
