import React from "react";
import styled from "styled-components";
import { defaultBoxStyle } from "../../style/mixins";

const S = {
  Wrapper: styled.div`
    ${defaultBoxStyle}
  `,
};

function UserAsset() {
  return <S.Wrapper>UserAsset</S.Wrapper>;
}

export default UserAsset;
