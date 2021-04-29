import styled from "styled-components";

export const AppWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  .now-playing {
    color: ${({ color }) => `rgb(${color})`};
    display: flex;
    padding: 1rem;
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
    height: 90px;
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

      :nth-of-type(2) {
        font-size: 2rem;
        background-color: ${({ color }) => `rgba(${color},0.1)`};
        padding: 1.3rem;
        border-radius: 1.3rem;
      }
    }
  }
`;
