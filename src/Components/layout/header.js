import React from "react";
import styled from "styled-components";
import { adaptiveBackground } from "../../style/mixins";
import ThemeToggleButton from "../common/ThemeToggleButton";

const S = {
  Header: styled.header`
    ${adaptiveBackground}

    display: flex;
    justify-content: space-between;
    padding: 24px;

    .header-left {
      font-weight: bold;
      font-size: 1.25rem;
      cursor: pointer;
    }
  `,
};

function Header() {
  return (
    <S.Header>
      <div
        className="header-left logo"
        onClick={() => window.location.reload()}
      >
        취금이니
      </div>
      <div className="header-right">
        <ThemeToggleButton />
      </div>
    </S.Header>
  );
}

export default Header;
