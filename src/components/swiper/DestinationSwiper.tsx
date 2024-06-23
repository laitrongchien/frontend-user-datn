"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperNavButton from "./SwiperNavButton";
import Image from "next/image";

const DestinationSwiper = ({ destinations }: { destinations: any[] }) => {
  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={1}
        modules={[]}
        className="relative"
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {destinations.map((destination: any, index: number) => (
          <SwiperSlide key={index}>
            <div className="relative">
              <Image
                src={destination.image}
                alt="destination-img"
                width={1365}
                height={547}
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-30 hover:opacity-0 transition-all duration-300"></div>
              <div className="absolute bottom-0 py-8 px-4 w-full">
                <h1 className="z-10 text-white border-b border-white font-extrabold">
                  {destination.name}
                </h1>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <SwiperNavButton />
      </Swiper>
    </div>
  );
};

export default DestinationSwiper;
