"use client";

import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import {
  LuCalendar,
  LuCircleDollarSign,
  LuMapPin,
  LuStar,
} from "react-icons/lu";
import { tourService } from "@/services/api/tour";
import { useAppSelector } from "@/store/hooks";
import { formatCurrency } from "@/utils/common";

const HorizTourCard = ({
  tour,
  hideHeartIcon,
}: {
  tour: any;
  hideHeartIcon: boolean;
}) => {
  const [isFavorited, setIsFavorited] = useState(tour.isFavorite);
  const { user } = useAppSelector((state) => state.auth);

  const handleLikeTour = async () => {
    setIsFavorited(!isFavorited);
    if (user) {
      await tourService.likeTour(tour._id);
    }
  };
  return (
    <div className="flex justify-between max-md:flex-col">
      <div className="relative">
        <Link href={`/tours/${tour._id}`}>
          <Image
            src={tour.imageCover}
            alt="img1"
            width={768}
            height={375}
            className="w-60 h-60 object-cover rounded-lg max-md:w-full max-md:h-auto"
          />
        </Link>
        {!hideHeartIcon && (
          <FaHeart
            size={22}
            color={isFavorited ? "#f96515" : "#666"}
            className="absolute top-3 right-3 cursor-pointer"
            onClick={handleLikeTour}
          />
        )}
      </div>
      <div className="md:px-6 flex flex-col justify-between flex-1">
        <h1 className="font-semibold max-md:mt-4">{tour.name}</h1>
        <div>
          <div className="flex items-center py-1">
            <LuCircleDollarSign size={24} />
            <p className="ml-4">
              <span className="font-semibold text-primary">
                {formatCurrency(tour.price)}
              </span>
              / người
            </p>
          </div>
          <div className="flex items-center py-1">
            <LuMapPin size={24} />
            <p className="ml-4">{tour.startLocation}</p>
          </div>
          <div className="flex items-center py-1">
            <LuCalendar size={24} />
            <p className="ml-4">
              {tour.duration} ngày/ {tour.duration - 1} đêm
            </p>
          </div>
          <div className="flex items-center py-1">
            <LuStar size={24} />
            <p className="ml-4">
              {tour.ratingsQuantity === 0
                ? "Chưa có đánh giá!"
                : `${tour.ratingsAverage} (${tour.ratingsQuantity})`}
            </p>
          </div>
        </div>
        <Link
          href={`/tours/${tour._id}`}
          className="w-full flex-center py-2 rounded-3xl text-primary font-medium hover:text-white bg-white hover:bg-primary border border-primary max-md:mt-4"
        >
          Đặt ngay
        </Link>
      </div>
    </div>
  );
};

export default HorizTourCard;
