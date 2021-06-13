import React, { useContext } from "react";
import styled from "styled-components";
import { deleteOrder, loadOrders } from "../../api";
import { CryptoContext } from "../../context/CryptoContext";
import { adaptiveBackground, defaultBoxStyle } from "../../style/mixins";
import { Empty } from "antd";
import Divider from "../common/Divider";
import { OrderContext } from "../../context/OrderContext";

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
  const { orderList } = useContext(OrderContext);

  const openOrderInSelectedMarket = orderList.myOrderList
    .filter((order) => order.status === 0)
    .filter((order) => order.market.name === selectedMarket.choosenMarket.name);

  const refreshWholeOrder = async () => {
    const wholeOrders = await loadOrders();
    orderList.setMyOrderList(wholeOrders);
  };

  const handleCancelButtonClick = async (openOrderId) => {
    const deleteOutput = await deleteOrder(openOrderId);

    // 삭제된 order를 반영하기 위해 다시 order fetching
    if (deleteOutput.status === -1) return refreshWholeOrder();
  };

  return (
    <S.Wrapper>
      <div>
        {openOrderInSelectedMarket.length === 0 && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
        {openOrderInSelectedMarket.map((openOrder) => (
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
