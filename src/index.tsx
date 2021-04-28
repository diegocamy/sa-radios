import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import App from "./App";

const GlobalStyles = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
  }

  body{
    font-family: 'Quicksand', sans-serif;
  }

  i {
    &:hover {
      cursor: pointer;
    }
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
