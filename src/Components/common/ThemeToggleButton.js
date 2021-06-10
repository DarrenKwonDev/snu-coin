import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as MoonSvg } from "../../style/svg/moon.svg";
import { ReactComponent as SunSvg } from "../../style/svg/sun.svg";

const S = {
  ThemeToggleButton: styled.div`
    width: 16px;
    height: 16px;

    &:hover {
      cursor: pointer;
    }
  `,
};

function ThemeToggleButton() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const changeTheme = () => {
    document.body.classList.toggle("dark-mode");
    setIsDarkMode((isDarkMode) => !isDarkMode);
  };

  return (
    <S.ThemeToggleButton>
      {isDarkMode ? (
        <SunSvg onClick={changeTheme} />
      ) : (
        <MoonSvg onClick={changeTheme} />
      )}
    </S.ThemeToggleButton>
  );
}

export default ThemeToggleButton;
