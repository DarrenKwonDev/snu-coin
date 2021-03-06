import React, { useContext, useState } from "react";
import styled from "styled-components";
import { loadOrders, postOrder } from "../../api";
import { AssetsContext } from "../../context/AssetsContext";
import { CryptoContext } from "../../context/CryptoContext";
import { adaptiveBackground, defaultBoxStyle } from "../../style/mixins";
import { message } from "antd";
import { debounce } from "../../utils/debounce";
import { OrderContext } from "../../context/OrderContext";

const S = {
  Wrapper: styled.div`
    ${defaultBoxStyle}
    padding: 0;
    border-top: 0;
  `,
  ButtonWrapper: styled.div`
    width: 100%;

    button {
      width: 50%;
      height: 50px;
      border: none;
      border-radius: 6px 6px 0 0;
      cursor: pointer;
      font-size: 1.5rem;
    }

    .buy-btn {
      background: ${(props) =>
        props.selected ? "var(--blue)" : "var(--adaptiveGray300)"};
      color: ${(props) =>
        props.selected ? "var(--adaptiveGray50)" : "var(--adaptiveGray600)"};
    }
    .sell-btn {
      background: ${(props) =>
        props.selected ? "var(--adaptiveGray300)" : "var(--red)"};
      color: ${(props) =>
        props.selected ? "var(--adaptiveGray600)" : "var(--adaptiveGray50)"};
    }
  `,
  InputWrapper: styled.div`
    display: flex;
    flex-direction: column;
    padding: 12px;

    label {
      display: flex;
      flex-direction: column;
    }

    input {
      ${adaptiveBackground}
      padding: 12px;
      margin: 12px 0;
      border-radius: 6px;
      border: 1px solid var(--adaptiveGray300);
    }
  `,
  CurrentAssetState: styled.div`
    margin-bottom: 32px;
  `,
  ActionButton: styled.button`
    border: none;
    border-radius: 6px;
    padding: 12px;
    cursor: pointer;

    background: ${(props) =>
      props.tradeOption ? "var(--blue)" : "var(--red)"};
    color: var(--adaptiveGray50);
  `,
};

function createToastMesssage(type, content) {
  switch (type) {
    case "success":
      return message.success({
        content,
        style: {
          marginTop: "20vh",
        },
      });

    case "error":
      return message.error({
        content,
        style: {
          marginTop: "50vh",
        },
      });

    default:
      return;
  }
}

function TradeForm() {
  const { userAssets } = useContext(AssetsContext);
  const { selectedMarket } = useContext(CryptoContext);
  const { orderList } = useContext(OrderContext);

  const [tradeOption, setTradeOption] = useState("buy");
  const [userOfferedPrice, setUserOfferedPrice] = useState(0);
  const [userOfferedAmount, setUserOfferedAmount] = useState(0);

  let myCurrency = userAssets.assets.find(
    (asset) => asset.symbol === selectedMarket.choosenMarket.currency
  );
  let myCoin = userAssets.assets.find(
    (asset) => asset.symbol === selectedMarket.choosenMarket.coin
  );

  const refreshWholeOrder = async () => {
    const wholeOrders = await loadOrders();
    orderList.setMyOrderList(wholeOrders);
  };

  const handleActionButtonClick = () => {
    const transactionInit = async () => {
      if (userOfferedPrice < selectedMarket.choosenMarket.minPrice)
        return createToastMesssage(
          "error",
          `?????? market??? ?????? ????????? ${selectedMarket.choosenMarket.minPrice} ?????????`
        );

      if (userOfferedAmount <= 0)
        return createToastMesssage(
          "error",
          "0?????? ??? ????????? ????????? ??? ????????????."
        );

      // market, price, quantity, remainQuantity ??????
      const orderData = await postOrder(
        userOfferedPrice,
        userOfferedAmount,
        selectedMarket.choosenMarket.name,
        tradeOption
      );
      if (orderData._id) {
        console.log("made order", orderData);

        // ???????????? ??????????????? ????????? ?????? order fetrching
        refreshWholeOrder();

        return createToastMesssage(
          "success",
          `${orderData.market} ???????????? ${selectedMarket.choosenMarket.coin}  ${orderData.quantity}?????? ?????? ${orderData.price} ${selectedMarket.choosenMarket.currency} ??? ${tradeOption} ?????? ?????? ??????`
        );
      }
      setUserOfferedPrice(0);
      setUserOfferedAmount(0);
    };
    transactionInit();
  };

  return (
    <S.Wrapper>
      <S.ButtonWrapper selected={tradeOption === "buy"}>
        <button className="buy-btn" onClick={() => setTradeOption("buy")}>
          ??????
        </button>
        <button className="sell-btn" onClick={() => setTradeOption("sell")}>
          ??????
        </button>
      </S.ButtonWrapper>

      <S.InputWrapper>
        <S.CurrentAssetState>
          {tradeOption === "buy" ? (
            <div>
              ?????? {selectedMarket.choosenMarket.currency} :{" "}
              {myCurrency?.quantity}
            </div>
          ) : (
            <div>
              ?????? {selectedMarket.choosenMarket.coin} : {myCoin?.quantity}
            </div>
          )}
          <div>
            ?????? ?????? : {selectedMarket.choosenMarket.minPrice}{" "}
            {selectedMarket.choosenMarket.currency}
          </div>
        </S.CurrentAssetState>

        <label>
          ?????? {selectedMarket.choosenMarket.currency}
          <input
            type="number"
            placeholder={`price (${selectedMarket.choosenMarket.currency})`}
            min={selectedMarket.choosenMarket.minPrice}
            value={userOfferedPrice}
            onChange={(e) => setUserOfferedPrice(e.target.value)}
          />
        </label>
        <label>
          ?????? {selectedMarket.choosenMarket.coin}
          <input
            type="number"
            placeholder={`amount (${selectedMarket.choosenMarket.coin})`}
            value={userOfferedAmount}
            onChange={(e) => setUserOfferedAmount(e.target.value)}
          />
        </label>
        <S.ActionButton
          tradeOption={tradeOption === "buy"}
          onClick={debounce(handleActionButtonClick, 250)}
        >
          {tradeOption === "buy" ? "??????" : "??????"}
        </S.ActionButton>
      </S.InputWrapper>
    </S.Wrapper>
  );
}

export default TradeForm;
