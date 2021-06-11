import React from "react";
import styled from "styled-components";
import { defaultBoxStyle } from "../../style/mixins";

const S = {
  Wrapper: styled.div`
    ${defaultBoxStyle}
  `,
};

function StockGraph() {
  return <S.Wrapper>stockgraph</S.Wrapper>;
}

export default StockGraph;
