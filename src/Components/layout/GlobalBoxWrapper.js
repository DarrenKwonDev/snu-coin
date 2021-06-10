import React from "react";
import styled from "styled-components";
import { adaptiveBackground } from "../../style/mixins";

const S = {
  GlobalBoxWrapper: styled.div`
    ${adaptiveBackground}
    padding: 24px;
    min-height: 100vh;
  `,
};

function GlobalBoxWrapper({ children }) {
  return <S.GlobalBoxWrapper>{children}</S.GlobalBoxWrapper>;
}

export default GlobalBoxWrapper;
