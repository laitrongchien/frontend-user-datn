"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import TourCard from "../card/TourCard";
import SwiperNavButton from "./SwiperNavButton";

const TourSwiper = ({ images }: { images: any[] }) => {
  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        modules={[]}
        className="relative"
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {images.map((image: number, index: number) => (
          <SwiperSlide key={index}>
            <TourCard />
          </SwiperSlide>
        ))}
        <SwiperNavButton />
      </Swiper>
    </div>
  );
};

export default TourSwiper;
