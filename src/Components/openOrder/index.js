import React from "react";
import styled from "styled-components";
import { loadOrders } from "../../api";
import { defaultBoxStyle } from "../../style/mixins";

const S = {
  Wrapper: styled.div`
    ${defaultBoxStyle}
  `,
};

function OpenOrder() {
  const getMyWholeOrders = async () => {
    const orders = await loadOrders();
    console.log(orders);
  };
  getMyWholeOrders();

  return <S.Wrapper>OpenOrder</S.Wrapper>;
}

export default OpenOrder;
