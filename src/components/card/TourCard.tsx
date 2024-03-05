"use client";

import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";

const TourCard = () => {
  const [isFavorited, setIsFavorited] = useState(false);
  return (
    <div className="rounded-lg shadow-md overflow-hidden cursor-pointer border border-gray-300">
      <div className="relative">
        <Image
          src="/img-1.webp"
          alt="img1"
          width={768}
          height={375}
          className="w-full object-cover lg:h-56"
        />
        <FaHeart
          size={22}
          color={isFavorited ? "#f96515" : "#666"}
          className="absolute top-3 right-3"
          onClick={() => setIsFavorited(!isFavorited)}
        />
      </div>
      <div className="p-2">
        <p className="text-primary py-1 border-b border-gray-300 font-semibold">
          $2000
        </p>
        <h1 className="font-semibold py-1 border-b border-gray-300">
          Experience Authentic Vietnam By Motorbikes - 12 Days
        </h1>
        <div className="mt-2">
          <p>Thời gian: 10 ngày</p>
          <p>Lộ trình: Hà Nội - Ninh Bình</p>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
