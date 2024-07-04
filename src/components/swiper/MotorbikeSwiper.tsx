"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperNavButton from "./SwiperNavButton";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/utils/common";
import { MdStar } from "react-icons/md";

const MotorbikeSwiper = ({ motorbikes }: { motorbikes: any[] }) => {
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
        {motorbikes.map((motorbike: any) => (
          <SwiperSlide key={motorbike._id}>
            <div className="rounded-lg shadow-md overflow-hidden border border-gray-300">
              <div className="relative overflow-hidden">
                <Link href={`/motorbikes/${motorbike._id}`}>
                  <Image
                    src={motorbike.image}
                    alt="motor-image"
                    width={279}
                    height={175}
                    className="w-full object-cover lg:h-52 sm:h-64 max-sm:h-72 hover:scale-125 transition-all duration-300"
                  />
                </Link>
              </div>
              <div className="p-2">
                <div className="flex items-center justify-between py-2 border-y border-gray-300">
                  <p>
                    <span className="text-primary font-semibold">
                      {formatCurrency(motorbike.price)}
                    </span>
                    / ngày
                  </p>
                  {motorbike.ratingsQuantity !== 0 && (
                    <div className="flex items-center">
                      <MdStar color="#fb923c" />
                      <p>{`${motorbike.ratingsAverage} (${motorbike.ratingsQuantity})`}</p>
                    </div>
                  )}
                </div>
                <div className="py-1 border-b border-gray-300">
                  <Link
                    href={`/motorbikes/${motorbike._id}`}
                    className="font-semibold"
                  >
                    {motorbike.name}
                  </Link>
                </div>
                <div className="mt-2">
                  <p>Phân khối xe: {motorbike.engine} cc</p>
                  <p>Dung tích xăng: {motorbike.fuelCapacity} l</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <SwiperNavButton />
      </Swiper>
    </div>
  );
};

export default MotorbikeSwiper;
