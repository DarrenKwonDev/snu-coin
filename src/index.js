import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./style/reset.css";
import { ThemeProvider } from "styled-components";
import theme from "./theme/theme";
import GlobalStyle from "./theme/globalStyle";

import LoginContextProvider from "./context/LoginContext";
import AssetsContextProvider from "./context/AssetsContext";
import CryptoContextProvider from "./context/CryptoContext";

ReactDOM.render(
  <>
    <LoginContextProvider>
      <AssetsContextProvider>
        <CryptoContextProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <App />
          </ThemeProvider>
        </CryptoContextProvider>
      </AssetsContextProvider>
    </LoginContextProvider>
  </>,
  document.getElementById("root")
);
