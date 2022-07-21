import { createContext } from "react";

export const CoinListContext = createContext<string[]>([
  "bitcoin",
  "ethereum",
  "litecoin",
  "dogecoin",
]);

type CoinListContextProviderProps = {
  children: React.ReactNode;
};

export const CoinListContextProvider = (
  props: CoinListContextProviderProps
) => {
  return (
    <CoinListContext.Provider
      value={["bitcoin", "ethereum", "litecoin", "dogecoin"]}
    >
      {props.children}
    </CoinListContext.Provider>
  );
};
