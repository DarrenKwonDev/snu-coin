import React from "react";
import styled from "styled-components";

const S = {
  Divider: styled.hr`
    border: none;
    border-top: 1px double var(--adaptiveGray300);
    margin: 12px 0;
    text-align: center;
  `,
};
function Divider() {
  return <S.Divider />;
}

export default Divider;
