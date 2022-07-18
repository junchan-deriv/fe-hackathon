/**
 * This file contain the definition of the types returned by the free coingecko apis
 */
/**
 * The object can be accessed in form of o['coin']['vs_cur']
 */
export declare type coingecko_current_price = any;

/**
 * o[k]=v where k is coin name
 */
export declare type coingecko_coin_kv = {
  [key: string]: number;
};

export declare type coingecko_coin_entry = {
  /**
   * id of the coin
   */
  id: string;
  /**
   * the name of the coin
   */
  name: string;
  /**
   * symbol/ticker for the coin
   */
  symbol: string;
};

/**
 * Coin entry returned by the /coins/list
 */
export declare type coingecko_coin_entries = coingecko_coin_entry[];

/**
 * Array representing the VS Currencies (a.k.a currencies to pair agianst)
 */
export declare type coingecko_vs_currencies = string[];

/**
 * the image pointer information
 */
export declare type coingecko_image_entry = {
  thumb: string;
  small: string;
  large: string;
};

/**
 * Market data for a coin
 */
export declare type coingecko_market_data = coingecko_coin_entry & {
  /**
   * The image
   */
  image: coingecko_image_entry;
  /**
   * Market data
   */
  market_data: {
    /**
     * Current price against all VS currencies
     */
    current_price: coingecko_coin_kv;
    /**
     * Highest value in 24 hours against all VS currencies
     */
    high_24h: coingecko_coin_kv;
    /**
     * Lowest value in 24 hours against all VS currencies
     */
    low_24h: coingecko_coin_kv;
    /**
     * Last change of price in 24 hours against all VS currencies
     */
    price_change_percentage_24h_in_currency: coingecko_coin_kv;
  };
};
