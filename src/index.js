import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "antd/dist/antd.css";
import "./style/reset.css";
import { ThemeProvider } from "styled-components";
import theme from "./theme/theme";
import GlobalStyle from "./theme/globalStyle";

import LoginContextProvider from "./context/LoginContext";
import AssetsContextProvider from "./context/AssetsContext";
import CryptoContextProvider from "./context/CryptoContext";
import OrderContextProvider from "./context/OrderContext";

ReactDOM.render(
  <>
    <LoginContextProvider>
      <AssetsContextProvider>
        <CryptoContextProvider>
          <OrderContextProvider>
            <ThemeProvider theme={theme}>
              <GlobalStyle />
              <App />
            </ThemeProvider>
          </OrderContextProvider>
        </CryptoContextProvider>
      </AssetsContextProvider>
    </LoginContextProvider>
  </>,
  document.getElementById("root")
);
