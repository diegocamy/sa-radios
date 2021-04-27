// import Swiper core and required modules
import SwiperCore, { Lazy, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

import logo from "../../assets/logos/csr.png";
import RadioCard from "../RadioCard/RadioCard";
import { Wrapper } from "./Slider.styles";

// install Swiper modules
SwiperCore.use([A11y, Lazy]);

const Slider = () => {
  return (
    <Wrapper>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        lazy={{ loadPrevNext: true }}
        loop={true}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <RadioCard img={logo} />
        </SwiperSlide>
        <SwiperSlide>
          <RadioCard img={logo} />
        </SwiperSlide>
        <SwiperSlide>
          <RadioCard img={logo} />
        </SwiperSlide>
      </Swiper>
    </Wrapper>
  );
};

export default Slider;
