import React, { createContext, useState } from "react";

export const CryptoContext = createContext(null);

function CryptoContextProvider({ children }) {
  const [wholeMarket, setwholeMarket] = useState([]);
  const [choosenMarket, setChoosenMarket] = useState([]);
  const [marketOrderBook, setMarketOrderBook] = useState({ buy: [], sell: [] });

  const store = {
    wholeMarketList: {
      wholeMarket,
      setwholeMarket,
    },
    selectedMarket: {
      choosenMarket,
      setChoosenMarket,
    },
    orderbook: {
      marketOrderBook,
      setMarketOrderBook,
    },
  };

  return (
    <CryptoContext.Provider value={store}>{children}</CryptoContext.Provider>
  );
}

export default CryptoContextProvider;
