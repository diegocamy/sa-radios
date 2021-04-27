import styled from "styled-components";

export const AppWrapper = styled.div`
  .now-playing {
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
    font-weight: bold;

    p {
      margin: 5px 1rem;
      font-size: 1.1rem;

      :last-of-type {
        color: darkgray;
      }
    }
  }

  .icons {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    font-size: 1.4rem;

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
      background-color: black;
    }

    .rc-slider-handle {
      background-color: black;
      border: none;
    }
  }

  .volume-icons {
    width: 80%;
    padding: 0.5rem 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
