import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import Radio from "./Components/Radio/Radio";

import GTAFont from "./fonts/pricedown.ttf";

const GlobalStyles = createGlobalStyle`
 @font-face {
      font-family: "Pricedown";
      src: local("Pricedown"), url(${GTAFont});
    }

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
    <Radio />
  </React.StrictMode>,
  document.getElementById("root")
);
