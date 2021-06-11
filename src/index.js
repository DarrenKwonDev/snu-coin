import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./style/reset.css";
import { ThemeProvider } from "styled-components";
import theme from "./theme/theme";
import GlobalStyle from "./theme/globalStyle";
import LoginContextProvider from "./context/LoginContext";

ReactDOM.render(
  <>
    <LoginContextProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </LoginContextProvider>
  </>,
  document.getElementById("root")
);
