import React from "react";
import styled from "styled-components";
import { defaultBoxStyle } from "../../style/mixins";

const S = {
  Wrapper: styled.div`
    ${defaultBoxStyle};
    position: relative;
  `,

  Blurred: styled.div`
    position: absolute;
    top: 0;
    left: 0;

    height: 100%;
    width: 100%;

    background: var(--lightblue);
    opacity: 0.5;
    filter: blur(4px);
  `,
  Info: styled.div`
    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;
    width: 100%;
  `,
};

function StockGraph() {
  return (
    <S.Wrapper>
      <S.Blurred></S.Blurred>
      <S.Info>stock graph is not available</S.Info>
    </S.Wrapper>
  );
}

export default StockGraph;
