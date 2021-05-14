import styled from "styled-components";

export const AppWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  max-width: 600px;
  margin: auto;
  z-index: 3;

  a {
    text-decoration: none;
    color: inherit;
  }

  .white {
    color: white;
  }

  .now-playing {
    color: ${({ color }) => `rgb(${color})`};
    display: flex;
    padding: 1rem;
    margin-bottom: 1rem;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2rem;

    i {
      font-size: 1rem;
    }
  }

  .radio-info {
    color: ${({ color }) => `rgb(${color})`};
    font-weight: bold;
    height: fit-content;
    text-align: center;
    width: 80%;
    margin: 1rem auto;
    margin-top: 2rem;
    p {
      margin: 5px 0;
      font-size: 1.1rem;

      :last-of-type {
        color: darkgray;
      }
    }
  }

  .icons {
    color: ${({ color }) => `rgb(${color})`};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.8rem;
    margin: auto;

    i {
      margin: 1rem;
    }

    img {
      width: 1.8rem;
      margin: 1rem;
      &:hover {
        cursor: pointer;
      }
    }
    .share {
      position: absolute;
      width: fit-content;
      border-radius: 10px;
      padding: 10px 5px;
      top: 55%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all 100ms linear;
      text-align: center;
      box-shadow: 2px 2px 5px grey;
      z-index: 10;
      background-color: white;

      p {
        margin: 5px;
        font-size: 1.5rem;
      }

      i {
        font-size: 2.5rem;
        margin: 5px;

        &:hover {
          transform: translateY(-2px);
        }
      }
    }
  }

  .rc-slider {
    width: 80%;
    margin: auto;

    .rc-slider-rail {
      height: 5px;
    }

    .rc-slider-track {
      height: 5px;
      background-color: ${({ color }) => `rgb(${color})`};
    }

    .rc-slider-handle {
      background-color: ${({ color }) => `rgb(${color})`};
      border: none;
    }
  }

  .volume-icons {
    color: ${({ color }) => `rgb(${color})`};
    width: 80%;
    padding: 0.5rem 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .control-icons {
    color: ${({ color }) => `rgb(${color})`};
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    i {
      font-size: 1.5rem;
      margin: 1rem;
      transition: transform 100ms linear;

      :nth-of-type(2) {
        font-size: 2rem;
        background-color: ${({ color }) => `rgba(${color},0.1)`};
        padding: 1.3rem;
        border-radius: 1.3rem;
      }

      &:active {
        transform: scale(0.9);
      }
    }
  }

  .spin {
    padding: 1.3rem 1.2rem !important;
    animation: spinner 2s linear infinite;
    background-color: white !important;

    &:hover {
      cursor: default;
    }
  }

  .identifying {
    animation: grow 1s linear infinite;
  }

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes grow {
    0% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }

  @media only screen and (min-width: 768px) {
    height: fit-content;
    width: 90%;
    max-width: 1000px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white !important;
    border-radius: 2rem;
    z-index: 500;

    .now-playing {
      padding: 1rem 2.5rem;
      margin-bottom: 1rem;
    }

    .radio-info {
      text-align: center;
      height: fit-content;
    }

    .icons {
      margin-bottom: 2rem;
    }

    .rc-slider {
      width: 50%;
    }

    .volume-icons {
      width: 50%;
    }
  }
`;

export const ToastifyTrack = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 20%;
    margin-right: 1rem;
  }
`;

export const RadioContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden !important;

  .particles {
    display: none;
  }

  @media only screen and (min-width: 768px) {
    overflow: auto;
    .particles {
      display: block;
      position: absolute;
      height: 100%;
      width: 100vw;
      top: 0;
      left: 0;
      z-index: 1;
      background-color: ${(props) => `rgba(${props.color},0.2)`};
    }
  }
`;
