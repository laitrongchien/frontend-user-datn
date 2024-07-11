"use client";

import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/utils/common";
import { MdStar } from "react-icons/md";

const TourCard = ({ tour }: { tour: any }) => {
  return (
    <div className="rounded-lg shadow-md overflow-hidden border border-gray-300">
      <div className="relative overflow-hidden">
        <Link href={`/tours/${tour._id}`}>
          <Image
            src={tour.imageCover}
            alt="img1"
            width={768}
            height={375}
            className="w-full object-cover lg:h-56 sm:h-64 max-sm:h-96 hover:scale-125 transition-all duration-300"
          />
        </Link>
      </div>
      <div className="p-2">
        <div className="flex items-center justify-between py-1 border-b border-gray-300">
          <p>
            <span className="text-primary font-semibold">
              {formatCurrency(tour.price)}
            </span>
            / người
          </p>
          {tour.ratingsQuantity !== 0 && (
            <div className="flex items-center">
              <MdStar color="#fb923c" />
              <p>{`${tour.ratingsAverage} (${tour.ratingsQuantity})`}</p>
            </div>
          )}
        </div>
        <div className="py-1 border-b border-gray-300 min-h-[60px]">
          <Link href={`/tours/${tour._id}`} className="font-semibold">
            {tour.name}
          </Link>
        </div>
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
