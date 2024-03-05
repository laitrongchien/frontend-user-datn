"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import Image from "next/image";
import img1 from "../../../public/img-1.webp";
import img2 from "../../../public/img-2.webp";
import img3 from "../../../public/img-3.webp";

const ImageSwiper = () => {
  return (
    <div>
      <Swiper
        slidesPerView={1}
        loop={true}
        centeredSlides={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image
            src={img1}
            alt="img1"
            sizes="100vw"
            className="w-full lg:h-[calc(100vh-74px)] object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={img2}
            alt="img2"
            sizes="100vw"
            className="w-full lg:h-[calc(100vh-74px)] object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={img3}
            alt="img3"
            sizes="100vw"
            className="w-full lg:h-[calc(100vh-74px)] object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ImageSwiper;
