import React from "react";
import styled from "styled-components";
import { defaultBoxStyle } from "../../style/mixins";

const S = {
  Wrapper: styled.div`
    ${defaultBoxStyle}

    display: flex;
    align-items: center;

    .crpyto-name {
      font-weight: bold;
      margin-right: 1rem;
    }
  `,
};

function CrpytoInfo() {
  return (
    <S.Wrapper>
      <div className="crpyto-name">snu/krw</div>
      <div className="price">10000</div>
    </S.Wrapper>
  );
}

export default CrpytoInfo;
