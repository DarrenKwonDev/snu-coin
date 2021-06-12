import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { loadMarket } from "../../api";
import { CryptoContext } from "../../context/CryptoContext";
import { defaultBoxStyle } from "../../style/mixins";
import Divider from "../../Components/common/Divider";
import useInterval from "../../hooks/useInterval";

const S = {
  Wrapper: styled.div`
    ${defaultBoxStyle}
  `,
  OrderHeader: styled.div`
    display: flex;
    width: 100%;
    color: var(--adaptiveGray600);

    .price {
      width: 40%;
      text-align: center;
    }

    .quantity {
      width: 60%;
      text-align: center;
    }
  `,
  OrderUnit: styled.div`
    display: flex;
    width: 100%;
    padding: 12px 0;
    cursor: pointer;

    color: ${(props) => (props.type === "buy" ? "var(--blue)" : "var(--red)")};
    background: ${(props) =>
      props.type === "buy" ? "var(--lightblue)" : "var(--lightred)"};

    .price {
      width: 40%;
      text-align: center;
    }

    .quantity {
      width: 60%;
      text-align: center;
    }

    &:hover {
      border: 1px solid var(--adaptiveGray700);
    }
  `,
};

function OrderBook() {
  const { selectedMarket } = useContext(CryptoContext);
  const [orderBookList, setOrderBookList] = useState({ buy: [], sell: [] });

  // 5초마다 update
  useInterval(async () => {
    const marketData = await loadMarket(selectedMarket.choosenMarket.name);
    setOrderBookList(marketData.orderBook);
  }, 5000);

  // 선택한 crypto가 변경된 경우 즉각적으로 data fetching
  useEffect(() => {
    const getSpecificMarket = async () => {
      const marketData = await loadMarket(selectedMarket.choosenMarket.name);
      setOrderBookList(marketData.orderBook);
    };
    getSpecificMarket();
  }, [selectedMarket]);

  return (
    <S.Wrapper>
      <S.OrderHeader>
        <div className="price">
          가격 : 1 {selectedMarket.choosenMarket.coin} ={" "}
          {selectedMarket.choosenMarket.currency}
        </div>
        <div className="quantity">
          수량 : {selectedMarket.choosenMarket.coin} 몇 개
        </div>
      </S.OrderHeader>
      <Divider />
      {orderBookList.buy.length > 0 &&
        orderBookList.buy.reverse().map((order, i) => (
          <S.OrderUnit key={i} type={"buy"}>
            <div className="price">{order.price} </div>
            <div className="quantity">{order.totalQuantity}</div>
          </S.OrderUnit>
        ))}
      {orderBookList.sell.length > 0 &&
        orderBookList.sell.map((order, i) => (
          <S.OrderUnit key={i} type={"sell"}>
            <div className="price">{order.price} </div>
            <div className="quantity">{order.totalQuantity}</div>
          </S.OrderUnit>
        ))}
    </S.Wrapper>
  );
}

export default OrderBook;
