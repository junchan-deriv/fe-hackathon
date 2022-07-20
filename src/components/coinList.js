import { createContext, useState } from "react";

export const CoinListContext = createContext([
  "bitcoin",
  "ethereum",
  "litecoin",
  "dogecoin",
]);

export const CoinListContextProvider = (props) => {
  const [coinList, setCoinList] = useState();

  return (
    <CoinListContext.Provider value={{ coinList }}>
      {props.children}
    </CoinListContext.Provider>
  );
};
