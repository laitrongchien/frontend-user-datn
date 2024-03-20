"use client";

import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import { MdHeight, MdLocalGasStation, MdStar } from "react-icons/md";
import { FaMotorcycle } from "react-icons/fa6";
import { motorbikeService } from "@/services/api/motorbike";
import { useAppSelector } from "@/store/hooks";
import { GiWeight } from "react-icons/gi";
import { formatCurrency } from "@/utils/common";

const MotorbikeCard = ({
  motorbike,
  hideHeartIcon,
}: {
  motorbike: any;
  hideHeartIcon: boolean;
}) => {
  const [isFavorited, setIsFavorited] = useState(motorbike.isFavorite);
  const { user } = useAppSelector((state) => state.auth);

  const handleLikeMotorbike = async () => {
    setIsFavorited(!isFavorited);
    if (user) {
      await motorbikeService.likeMotorbike(motorbike._id);
    }
  };

  return (
    <div className="flex justify-between max-md:flex-col">
      <div className="relative">
        <Link href={`/motorbikes/${motorbike._id}`}>
          <Image
            src={motorbike.image}
            alt="img1"
            width={279}
            height={175}
            className="w-80 h-52 object-cover rounded-lg max-md:w-full max-md:h-auto border border-gray-400"
          />
        </Link>
        {!hideHeartIcon && (
          <FaHeart
            size={22}
            color={isFavorited ? "#f96515" : "#666"}
            className="absolute top-3 right-3 cursor-pointer"
            onClick={handleLikeMotorbike}
          />
        )}
      </div>
      <div className="md:px-6 flex flex-col justify-between flex-1">
        <div>
          <h1 className="font-semibold max-md:mt-4">{motorbike.name}</h1>
          <div className="flex justify-between">
            <p>
              <span className="text-primary font-semibold">
                {formatCurrency(motorbike.price)}
              </span>
              /ngày
            </p>
            {motorbike.ratingsQuantity !== 0 && (
              <div className="flex items-center">
                <MdStar color="#fb923c" />
                <p>{`${motorbike.ratingsAverage} (${motorbike.ratingsQuantity})`}</p>
              </div>
            )}
          </div>
          <div className="flex items-center mt-4">
            <div className="flex items-center py-1 min-w-[100px]">
              <FaMotorcycle size={24} />
              <p className="ml-4">{motorbike.engine} cc</p>
            </div>
            <div className="flex items-center py-1 ml-12">
              <GiWeight size={24} />
              <p className="ml-4">{motorbike.weight} kg</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center py-1 min-w-[100px]">
              <MdHeight size={24} />
              <p className="ml-4">{motorbike.height} mm</p>
            </div>
            <div className="flex items-center py-1 ml-12">
              <MdLocalGasStation size={24} />
              <p className="ml-4">{motorbike.fuelCapacity} l</p>
            </div>
          </div>
        </div>

        <Link
          href={`/motorbikes/${motorbike._id}`}
          className="w-full flex-center py-2 rounded-3xl text-primary font-medium hover:text-white bg-white hover:bg-primary border border-primary max-md:mt-4"
        >
          Đặt ngay
        </Link>
      </div>
    </div>
  );
};

export default MotorbikeCard;
