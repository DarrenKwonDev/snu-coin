import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { loadAssets, loadOrders, loginByKey, LOGIN_KEY } from "./api";
import FullPageLoader from "./Components/common/FullPageLoader";
import CrpytoInfo from "./Components/cryptoInfo";
import Header from "./Components/layout/Header";
import OpenOrder from "./Components/openOrder";
import OrderBook from "./Components/orderBook";
import StockGraph from "./Components/stockGraph";
import TradeForm from "./Components/tradeForm";
import UserAsset from "./Components/userAsset";
import UserAuth from "./Components/userAuth";
import { AssetsContext } from "./context/AssetsContext";
import { LoginContext } from "./context/LoginContext";
import { OrderContext } from "./context/OrderContext";
import { adaptiveBackground } from "./style/mixins";

const S = {
  GlobalBoxWrapper: styled.div`
    ${adaptiveBackground}
    display: grid;

    gap: 12px;

    padding: 24px;
    min-height: 100vh;
    /* min-width: 1024px; */

    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 72px 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-areas:
      "crpytoInfo crpytoInfo crpytoInfo crpytoInfo userAuth userAuth"
      "stockGraph stockGraph stockGraph stockGraph userAuth userAuth"
      "stockGraph stockGraph stockGraph stockGraph userAsset userAsset"
      "orderBook orderBook tradeForm tradeForm userAsset userAsset"
      "orderBook orderBook tradeForm tradeForm openOrder openOrder"
      "orderBook orderBook tradeForm tradeForm openOrder openOrder"
      ". . . .  openOrder openOrder";

    .crpytoInfo {
      grid-area: crpytoInfo;
    }
    .openOrder {
      grid-area: openOrder;
    }
    .orderBook {
      grid-area: orderBook;
    }
    .stockGraph {
      grid-area: stockGraph;
    }
    .tradeForm {
      grid-area: tradeForm;
    }
    .userAsset {
      grid-area: userAsset;
    }
    .userAuth {
      grid-area: userAuth;
    }
  `,
};

function App() {
  const { authenticated, userName } = useContext(LoginContext);
  const { userAssets } = useContext(AssetsContext);
  const { orderList } = useContext(OrderContext);

  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  useEffect(() => {
    const loadOwnAssets = async () => {
      if (!authenticated.isAuthenticated) {
        console.log("not authenticated");
        return;
      }

      const assetData = await loadAssets();
      userAssets.setAssets(assetData);
    };

    const authenticationCheck = async () => {
      const key = localStorage.getItem(LOGIN_KEY);
      if (key) {
        const loginByKeyData = await loginByKey(key);
        if (loginByKeyData.name) {
          userName.setName(loginByKeyData.name.split("@")[0]);
          authenticated.setIsAuthenticated(true);
        } else {
          console.error("name not found in app.js");
          alert("fail to login");
          userName.setName(null);
          authenticated.setIsAuthenticated(false);
        }
      } else {
        userName.setName(null);
        authenticated.setIsAuthenticated(false);
      }
    };

    const loadWholeOrder = async () => {
      const wholeOrders = await loadOrders();
      orderList.setMyOrderList(wholeOrders);
    };

    authenticationCheck();

    if (authenticated.isAuthenticated) {
      loadOwnAssets();
      loadWholeOrder();
    }
  }, [authenticated]);

  return (
    <>
      <FullPageLoader isLoading={isLoading} />
      <Header />
      <S.GlobalBoxWrapper>
        <div className="crpytoInfo">
          <CrpytoInfo />
        </div>
        <div className="openOrder">
          <OpenOrder />
        </div>
        <div className="orderBook">
          <OrderBook />
        </div>
        <div className="stockGraph">
          <StockGraph />
        </div>
        <div className="tradeForm">
          <TradeForm />
        </div>
        <div className="userAsset">
          <UserAsset />
        </div>
        <div className="userAuth">
          <UserAuth />
        </div>
      </S.GlobalBoxWrapper>
    </>
  );
}

export default App;
