"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import TourCard from "../card/TourCard";
import SwiperNavButton from "./SwiperNavButton";

const TourSwiper = ({ tours }: { tours: any[] }) => {
  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        modules={[]}
        className="relative"
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {tours.map((tour: any, index: number) => (
          <SwiperSlide key={index}>
            <TourCard tour={tour} />
          </SwiperSlide>
        ))}
        <SwiperNavButton />
      </Swiper>
    </div>
  );
};

export default TourSwiper;
