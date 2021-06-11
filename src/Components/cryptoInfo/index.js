import React from "react";
import styled from "styled-components";
import { defaultBoxStyle } from "../../style/mixins";

const S = {
  Wrapper: styled.div`
    ${defaultBoxStyle}

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;

    .crpyto-name {
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    .price {
      font-size: 1.5rem;
      font-weight: bold;
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
