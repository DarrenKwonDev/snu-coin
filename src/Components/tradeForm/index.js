import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AssetsContext } from "../../context/AssetsContext";
import { CryptoContext } from "../../context/CryptoContext";
import { defaultBoxStyle } from "../../style/mixins";

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

function TradeForm() {
  const { userAssets } = useContext(AssetsContext);
  const { selectedMarket } = useContext(CryptoContext);

  const [tradeOption, setTradeOption] = useState("buy");
  const [userOfferedPrice, setUserOfferedPrice] = useState(0);
  const [userOfferedAmount, setUserOfferedAmount] = useState(0);

  let myCurrency = userAssets.assets.find(
    (asset) => asset.symbol === selectedMarket.choosenMarket.currency
  );
  let myCoin = userAssets.assets.find(
    (asset) => asset.symbol === selectedMarket.choosenMarket.coin
  );

  return (
    <S.Wrapper>
      <S.ButtonWrapper selected={tradeOption === "buy"}>
        <button className="buy-btn" onClick={() => setTradeOption("buy")}>
          매수
        </button>
        <button className="sell-btn" onClick={() => setTradeOption("sell")}>
          매도
        </button>
      </S.ButtonWrapper>

      <S.InputWrapper>
        <S.CurrentAssetState>
          {tradeOption === "buy" ? (
            <div>
              보유 {selectedMarket.choosenMarket.currency} :{" "}
              {myCurrency?.quantity}
            </div>
          ) : (
            <div>
              보유 {selectedMarket.choosenMarket.coin} : {myCoin?.quantity}
            </div>
          )}
          <div>
            최소 가격 : {selectedMarket.choosenMarket.minPrice}{" "}
            {selectedMarket.choosenMarket.currency}
          </div>
        </S.CurrentAssetState>

        <label>
          가격 {selectedMarket.choosenMarket.currency}
          <input
            type="number"
            placeholder={`price (${selectedMarket.choosenMarket.currency})`}
            min={selectedMarket.choosenMarket.minPrice}
            value={userOfferedPrice}
            onChange={(e) => setUserOfferedPrice(e.target.value)}
          />
        </label>
        <label>
          수량 {selectedMarket.choosenMarket.coin}
          <input
            type="number"
            placeholder={`amount (${selectedMarket.choosenMarket.coin})`}
            value={userOfferedAmount}
            onChange={(e) => setUserOfferedAmount(e.target.value)}
          />
        </label>
        <S.ActionButton tradeOption={tradeOption === "buy"}>
          {tradeOption === "buy" ? "매수" : "매도"}
        </S.ActionButton>
      </S.InputWrapper>
    </S.Wrapper>
  );
}

export default TradeForm;
