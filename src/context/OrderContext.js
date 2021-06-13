import React, { createContext, useState } from "react";

export const OrderContext = createContext(null);

function OrderContextProvider({ children }) {
  const [myOrderList, setMyOrderList] = useState([]);

  const store = {
    orderList: {
      myOrderList,
      setMyOrderList,
    },
  };

  return (
    <OrderContext.Provider value={store}>{children}</OrderContext.Provider>
  );
}

export default OrderContextProvider;
