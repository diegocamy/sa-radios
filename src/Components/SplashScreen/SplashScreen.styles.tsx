import styled from "styled-components";

export const SplashWrapper = styled.div`
  height: 100vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  .canva {
    height: 100%;
    width: 100%;
    background-color: #000;
    position: absolute;
    z-index: 1;
  }

  .text {
    color: white;
    z-index: 15;
    h1 {
      font-family: "Pricedown";
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    h3 {
      margin-bottom: 1rem;
      font-size: 1rem;
    }

    button {
      border: none;
      border-radius: 1rem;
      padding: 1rem 2rem;
      background-color: firebrick;
      color: white;
      font-size: 1rem;
      font-weight: bold;
      transition: transform 50ms linear;
      font-family: inherit;
      &:active {
        transform: scale(0.95);
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
`;
