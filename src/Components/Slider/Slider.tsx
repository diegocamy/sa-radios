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
import { RadioStation } from "../../interfaces";
import { Action } from "../../App";

// install Swiper modules
SwiperCore.use([A11y, Lazy, Navigation]);

type Props = {
  radios: RadioStation[];
  dispatch: React.Dispatch<Action>;
};

const Slider = ({ radios, dispatch }: Props) => {
  return (
    <Wrapper>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        onSlideChange={(swiper) =>
          dispatch({ type: "change-radio", radio: radios[swiper.realIndex] })
        }
        navigation={{
          nextEl: ".next-radio",
          prevEl: ".prev-radio",
        }}
      >
        {radios?.map((r) => (
          <SwiperSlide key={r.id}>
            <RadioCard img={r.logo} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
};

export default Slider;
