import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { deleteOrder, loadOrders } from "../../api";
import { CryptoContext } from "../../context/CryptoContext";
import { adaptiveBackground, defaultBoxStyle } from "../../style/mixins";
import { Empty } from "antd";
import Divider from "../common/Divider";

const S = {
  Wrapper: styled.div`
    ${defaultBoxStyle}
  `,
  OpenOrderItem: styled.div`
    display: flex;
    flex-direction: column;

    padding: 12px;
    margin-bottom: 6px;

    background: ${(props) =>
      props.side ? "var(--lightblue)" : "var(--lightred)"};

    .side-info {
      display: flex;
      justify-content: space-between;

      .crpyto {
        font-weight: bold;
        margin-right: 1rem;
        font-size: 1.25rem;
      }
    }
    .price {
    }
    .quantity {
    }
    .created-time {
    }
  `,
  CancelButton: styled.button`
    ${adaptiveBackground}
    border: 2px solid ${(props) => (props.side ? "var(--blue)" : "var(--red)")};
    border-radius: 6px;
    margin-top: 6px;
    padding: 6px;
    cursor: pointer;

    &:hover {
      background: ${(props) => (props.side ? "var(--blue)" : "var(--red)")};
      transition: background 0.2s ease;
    }
  `,
};

function OpenOrder() {
  const { selectedMarket } = useContext(CryptoContext);
  const [openOrderList, setOpenOrderList] = useState([]);

  const getMyWholeOrders = async () => {
    const orders = await loadOrders();
    const openOrderInSelectedMarket = orders
      .filter((order) => order.status === 0)
      .filter(
        (order) => order.market.name === selectedMarket.choosenMarket.name
      );

    setOpenOrderList(openOrderInSelectedMarket);
  };

  useEffect(() => {
    getMyWholeOrders();
  }, [selectedMarket]);

  const handleCancelButtonClick = async (openOrderId) => {
    const deleteOutput = await deleteOrder(openOrderId);
    if (deleteOutput.status === -1) {
      return getMyWholeOrders();
    }
  };

  return (
    <S.Wrapper>
      <div>
        {openOrderList.length === 0 && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
        {openOrderList.map((openOrder) => (
          <S.OpenOrderItem side={openOrder.side === "buy"} key={openOrder._id}>
            <div className="side-info">
              <div>
                <p className="crpyto">{selectedMarket.choosenMarket.coin}</p>
                <p>{openOrder.side === "buy" ? "매수" : "매도"}</p>
              </div>
              <S.CancelButton
                side={openOrder.side === "buy"}
                onClick={() => handleCancelButtonClick(openOrder._id)}
              >
                취소
              </S.CancelButton>
            </div>
            <Divider />
            <div className="price">
              가격 : {openOrder.price} {selectedMarket.choosenMarket.currency}
            </div>
            <div className="quantity">수량 : {openOrder.quantity}</div>
            <div className="created-time">
              거래 생성일 : {openOrder.createdAt}
            </div>
          </S.OpenOrderItem>
        ))}
      </div>
    </S.Wrapper>
  );
}

export default OpenOrder;
