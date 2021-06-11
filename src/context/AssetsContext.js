import React, { createContext, useState } from "react";

export const AssetsContext = createContext(null);

function AssetsContextProvider({ children }) {
  const [assets, setAssets] = useState([]);

  const store = {
    userAssets: {
      assets,
      setAssets,
    },
  };

  return (
    <AssetsContext.Provider value={store}>{children}</AssetsContext.Provider>
  );
}

export default AssetsContextProvider;
