"use client";

import ReviewCard from "@/components/card/ReviewCard";
import Image from "next/image";
import { MdOutlineCheck } from "react-icons/md";
import { useEffect, useState } from "react";
import { motorbikeService } from "@/services/api/motorbike";
import Loading from "@/components/global/Loading";
import RentMotorbikeForm from "@/components/order/RentMotorbikeForm";

const MotorbikeDetail = ({ params }: { params: { id: string } }) => {
  const [motorbike, setMotorbike] = useState<any>();
  const [loading, setLoading] = useState(false);

  const motorbikeId = params.id;
  useEffect(() => {
    if (motorbikeId) {
      const fetchMotorbike = async () => {
        setLoading(true);
        const res = await motorbikeService.getMotorbikeById(motorbikeId);
        setLoading(false);
        setMotorbike(res.data);
      };
      fetchMotorbike();
    }
  }, [motorbikeId]);

  if (loading) return <Loading />;

  return (
    <div>
      <div className="flex relative p-10">
        <div className="basis-[64%] px-10">
          {motorbike && (
            <Image
              src={motorbike.image}
              alt="img1"
              width={1024}
              height={759}
              className="w-[80%] object-cover rounded-lg"
            />
          )}
          <h1 className="font-sans text-4xl font-semibold mt-4">
            {motorbike?.name}
          </h1>
          <div className="mt-2">
            <h1 className="text-lg font-semibold">Tổng quan</h1>
            <p className="mt-2">{motorbike?.description}</p>
            <h1 className="text-lg font-semibold mt-4">Thông số</h1>
            {/* <p className="py-2">Loại xe: Xe ga</p> */}
            <p className="py-2">Phân khối: {motorbike?.engine} cc</p>
            <p className="py-2">Khối lượng: {motorbike?.weight} kg</p>
            <p className="py-2">Chiều cao yên: {motorbike?.height} mm</p>
            <p className="py-2">
              Dung tích bình xăng: {motorbike?.fuelCapacity} l
            </p>
          </div>
          <div className="mt-4">
            <h1 className="text-lg font-semibold">Bao gồm trong tiền thuê:</h1>
            <div className="flex items-center flex-wrap">
              <div className="basis-1/2 mt-4 flex items-center">
                <Image
                  src="https://cdn.riderly.com/storage/media/img/addons/helmet.svg"
                  alt="img-source"
                  width={150}
                  height={150}
                  className="w-8 h-8 object-cover"
                />
                <p className="ml-4 mr-2">Mũ bảo hiểm</p>
                <MdOutlineCheck size={24} color="#28a745" />
              </div>
              <div className="basis-1/2 mt-4 flex items-center">
                <Image
                  src="https://cdn.riderly.com/storage/media/img/addons/padlock.svg"
                  alt="img-source"
                  width={150}
                  height={150}
                  className="w-8 h-8 object-cover"
                />
                <p className="ml-4 mr-2">Khóa xe</p>
                <MdOutlineCheck size={24} color="#28a745" />
              </div>
              <div className="basis-1/2 mt-4 flex items-center">
                <Image
                  src="https://cdn.riderly.com/storage/media/img/addons/mechanic.svg"
                  alt="img-source"
                  width={150}
                  height={150}
                  className="w-8 h-8 object-cover"
                />
                <p className="ml-4 mr-2">Hỗ trợ sửa chữa</p>
                <MdOutlineCheck size={24} color="#28a745" />
              </div>
              <div className="basis-1/2 mt-4 flex items-center">
                <Image
                  src="https://cdn.riderly.com/storage/media/img/addons/bike_replacement.svg"
                  alt="img-source"
                  width={150}
                  height={150}
                  className="w-8 h-8 object-cover"
                />
                <p className="ml-4 mr-2">Thay thế xe</p>
                <MdOutlineCheck size={24} color="#28a745" />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h1 className="text-lg font-semibold">Đánh giá từ khách hàng</h1>
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
          </div>
        </div>

        <div className="basis-[36%] relative">
          <div className="w-full top-[106px] right-0 sticky">
            <RentMotorbikeForm
              motorbikeId={motorbikeId}
              motorbikePrice={motorbike?.price}
            />
          </div>
        </div>
      </div>
      <div className="h-[200vh] bg-orange-600"></div>
    </div>
  );
};

export default MotorbikeDetail;
