import React from "react";
import styled from "styled-components";
import { defaultBoxStyle } from "../../style/mixins";

const S = {
  Wrapper: styled.div`
    ${defaultBoxStyle}
  `,
};

function TradeForm() {
  return <S.Wrapper>TradeForm</S.Wrapper>;
}

export default TradeForm;
