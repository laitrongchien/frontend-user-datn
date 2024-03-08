"use client";

import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { tourService } from "@/services/api/tour";

const TourCard = ({ tour }: { tour: any }) => {
  return (
    <div className="rounded-lg shadow-md overflow-hidden cursor-pointer border border-gray-300">
      <div className="relative">
        <Image
          src={tour.imageCover}
          alt="img1"
          width={768}
          height={375}
          className="w-full object-cover lg:h-56 sm:h-64 max-sm:h-96"
        />
      </div>
      <div className="p-2">
        <p className="text-primary py-1 border-b border-gray-300 font-semibold">
          $2000
        </p>
        <h1 className="font-semibold py-1 border-b border-gray-300">
          {tour.name}
        </h1>
        <div className="mt-2">
          <p>
            Thời gian: {tour.duration} ngày / {tour.duration - 1} đêm
          </p>
          <p>Điểm xuất phát: {tour.startLocation}</p>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
