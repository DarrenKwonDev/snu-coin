import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./style/reset.css";
import styled, { ThemeProvider } from "styled-components";
import theme from "./theme/theme";
import GlobalStyle from "./theme/globalStyle";

const S = {
  GlobalWrapper: styled.div``,
};

ReactDOM.render(
  <>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <S.GlobalWrapper>
        <App />
      </S.GlobalWrapper>
    </ThemeProvider>
  </>,
  document.getElementById("root")
);
