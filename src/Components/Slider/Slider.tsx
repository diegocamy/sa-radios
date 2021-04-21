// import Swiper core and required modules
import SwiperCore, { Lazy, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

// install Swiper modules
SwiperCore.use([A11y, Lazy]);

const Slider = () => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      lazy={{ loadPrevNext: true }}
      loop={true}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      <SwiperSlide>hola</SwiperSlide>
    </Swiper>
  );
};

export default Slider;
