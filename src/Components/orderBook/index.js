import React from "react";
import styled from "styled-components";
import { defaultBoxStyle } from "../../style/mixins";

const S = {
  Wrapper: styled.div`
    ${defaultBoxStyle}
  `,
};

function OrderBook() {
  return <S.Wrapper>orderbook</S.Wrapper>;
}

export default OrderBook;
