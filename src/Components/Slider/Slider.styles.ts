import styled from "styled-components";

export const Wrapper = styled.div`
  .swiper-container {
    .swiper-wrapper {
      .swiper-slide {
        div {
          margin: auto;
          width: 50%;
        }
      }
    }
  }

  @media only screen and (min-width: 768px) {
    .swiper-container {
      .swiper-wrapper {
        .swiper-slide {
          div {
            margin: auto;
            width: 20%;
          }
        }
      }
    }
  }
`;
