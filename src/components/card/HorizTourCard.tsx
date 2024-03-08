"use client";

import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import {
  LuCalendar,
  LuCircleDollarSign,
  LuMapPin,
  LuStar,
} from "react-icons/lu";
import Link from "next/link";

const HorizTourCard = ({ tour }: { tour: any }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  return (
    <div className="flex justify-between mt-20 max-md:flex-col basis-[48%] max-md:basis-[100%]">
      <div className="relative">
        <Image
          src={tour.imageCover}
          alt="img1"
          width={768}
          height={375}
          className="w-60 h-60 object-cover rounded-lg max-md:w-full max-md:h-auto"
        />
        <FaHeart
          size={22}
          color={isFavorited ? "#f96515" : "#666"}
          className="absolute top-3 right-3"
          onClick={() => setIsFavorited(!isFavorited)}
        />
      </div>
      <div className="md:px-6 flex flex-col justify-between flex-1">
        <h1 className="font-semibold max-md:mt-4">{tour.name}</h1>
        <div>
          <div className="flex items-center py-1">
            <LuMapPin size={24} />
            <p className="ml-4">{tour.startLocation}</p>
          </div>
          <div className="flex items-center py-1">
            <LuCalendar size={24} />
            <p className="ml-4">{tour.duration}</p>
          </div>
          <div className="flex items-center py-1">
            <LuCircleDollarSign size={24} />
            <p className="ml-4">{tour.price}</p>
          </div>
          <div className="flex items-center py-1">
            <LuStar size={24} />
            <p className="ml-4">{tour.ratingsAverage}</p>
          </div>
        </div>
        <Link
          href={"/"}
          className="w-full flex-center py-2 rounded-3xl text-primary font-medium hover:text-white bg-white hover:bg-primary border border-primary max-md:mt-4"
        >
          Đặt ngay
        </Link>
      </div>
    </div>
  );
};

export default HorizTourCard;
