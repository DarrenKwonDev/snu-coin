import React from "react";
import styled from "styled-components";
import { defaultBoxStyle } from "../../style/mixins";

const S = {
  Wrapper: styled.div`
    ${defaultBoxStyle}
  `,
};

function OpenOrder() {
  return <S.Wrapper>OpenOrder</S.Wrapper>;
}

export default OpenOrder;
