import styled from "styled-components";
import CrpytoInfo from "./Components/cryptoInfo";
import Header from "./Components/layout/Header";
import OpenOrder from "./Components/openOrder";
import OrderBook from "./Components/orderBook";
import StockGraph from "./Components/stockGraph";
import TradeForm from "./Components/tradeForm";
import UserAsset from "./Components/userAsset";
import UserAuth from "./Components/userAuth";
import { adaptiveBackground } from "./style/mixins";

const S = {
  GlobalBoxWrapper: styled.div`
    ${adaptiveBackground}
    display: grid;
    gap: 6px;

    padding: 24px;
    min-height: 100vh;

    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 50px 1fr 1fr 1fr 1fr 1fr;
    grid-template-areas:
      "crpytoInfo crpytoInfo crpytoInfo crpytoInfo userAuth userAuth"
      "stockGraph stockGraph stockGraph stockGraph userAuth userAuth"
      "stockGraph stockGraph stockGraph stockGraph userAsset userAsset"
      "orderBook orderBook tradeForm tradeForm userAsset userAsset"
      "orderBook orderBook tradeForm tradeForm openOrder openOrder"
      "orderBook orderBook tradeForm tradeForm openOrder openOrder";

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
  return (
    <>
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
