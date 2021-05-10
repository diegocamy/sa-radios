import { useContext } from "react";

// import Swiper core and required modules
import SwiperCore, { Lazy, A11y, Navigation } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

import RadioCard from "../RadioCard/RadioCard";
import { Wrapper } from "./Slider.styles";
import { StateContext } from "../Radio/Radio";

// install Swiper modules
SwiperCore.use([A11y, Lazy, Navigation]);

const Slider = () => {
  const { dispatch, state } = useContext(StateContext);
  return (
    <Wrapper>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        onSlideChange={(swiper) =>
          dispatch({
            type: "change-radio",
            radio: state.radios[swiper.realIndex],
          })
        }
        navigation={{
          nextEl: ".next-radio",
          prevEl: ".prev-radio",
        }}
        allowSlideNext={state.identifying ? false : true}
        allowSlidePrev={state.identifying ? false : true}
      >
        {state.radios?.map((r) => (
          <SwiperSlide key={r.id}>
            <RadioCard img={r.logo} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
};

export default Slider;
