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

    .header-middle {
      display: flex;
      justify-content: left;
      font-size: 1rem;

      .menu-option {
        margin-right: 1.25rem;
        cursor: pointer;

        &:hover {
          color: var(--blue);
          transition: color 0.1s linear forward;
        }
      }
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
      <div className="header-middle menu">
        <div className="menu-option menu-one">거래소</div>
        <div className="menu-option menu-two">
          <a href="https://cryptoquant.com">cryptoquant</a>
        </div>
        <div className="menu-option menu-three">
          <a href="https://xangle.io/">Xangle 공시</a>
        </div>
      </div>
      <div className="header-right">
        <ThemeToggleButton />
      </div>
    </S.Header>
  );
}

export default Header;
