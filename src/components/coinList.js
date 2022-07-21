import { createContext } from "react";

export const CoinListContext = createContext([
  "bitcoin",
  "ethereum",
  "litecoin",
  "dogecoin",
]);

export const CoinListContextProvider = (props) => {
  return <CoinListContext.Provider>{props.children}</CoinListContext.Provider>;
};
