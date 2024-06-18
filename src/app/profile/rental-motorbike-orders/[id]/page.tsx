"use client";

import Link from "next/link";
import Image from "next/image";
import Loading from "@/components/global/Loading";
import { rentalService } from "@/services/api/rental";
import { useState, useEffect } from "react";
import { formatCurrency, formatTime } from "@/utils/common";
import ProfileLayout from "@/components/profile/ProfileLayout";
import { MdArrowBackIos } from "react-icons/md";

const RentalDetail = ({ params }: { params: { id: string } }) => {
  const [rentalDetail, setRentalDetail] = useState<any>();
  const [loading, setLoading] = useState(false);

  const rentalId = params.id;
  useEffect(() => {
    if (rentalId) {
      const fetchRentalDetail = async () => {
        setLoading(true);
        const res = await rentalService.getMotorbikeRentalDetail(rentalId);
        setLoading(false);
        setRentalDetail(res.data);
      };
      fetchRentalDetail();
    }
  }, [rentalId]);

  return (
    <ProfileLayout>
      <div className="rounded-lg px-10 py-4 w-full h-full bg-white shadow-md">
        {loading ? (
          <Loading />
        ) : (
          <div>
            <Link
              href={"/profile/rental-motorbike-orders"}
              className="flex items-center gap-2"
            >
              <MdArrowBackIos />
              <span>Quay lại</span>
            </Link>
            <div className="border-b border-gray-200 pb-6">
              <h1 className="text-lg font-semibold">
                Chi tiết đơn thuê xe {rentalDetail?._id}
              </h1>
            </div>
            <div>
              {rentalDetail?.motorbikes.map((data: any) => (
                <div
                  key={data._id}
                  className="flex py-6 border-b border-gray-200 justify-between"
                >
                  <div className="flex">
                    <Image
                      src={data.motorbike.image}
                      alt="img1"
                      width={279}
                      height={175}
                      className="w-72 h-48 object-cover max-md:w-full max-md:h-auto border border-gray-300"
                    />
                    <div className="ml-16">
                      <h1 className="text-xl font-semibold">
                        {data.motorbike.name}
                      </h1>
                      <h1>
                        Giá thuê:{" "}
                        <span className="text-primary">
                          {formatCurrency(data.motorbike.price)}
                        </span>
                        /ngày
                      </h1>
                      <p>Ngày nhận: {formatTime(data.startDate)}</p>
                      <p>Ngày trả: {formatTime(data.finishDate)}</p>
                      <p>Số lượng xe thuê: {data.numMotorbikes}</p>
                    </div>
                  </div>
                  <p>
                    Tổng tiền thuê:{" "}
                    <span className="text-primary">
                      {formatCurrency(
                        data.motorbike.price * data.numMotorbikes
                      )}
                    </span>
                  </p>
                </div>
              ))}
              <div className="flex justify-end">
                <div>
                  <p className="flex justify-between">
                    <span>Tổng tiền phải trả:</span>
                    <span className="text-primary font-semibold">
                      {formatCurrency(rentalDetail?.totalPrice)}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span>Đã thanh toán:</span>
                    <span className="text-primary font-semibold">
                      {rentalDetail?.paymentType === "payAll"
                        ? formatCurrency(rentalDetail?.totalPrice)
                        : formatCurrency(rentalDetail?.totalPrice * 0.2)}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span>Thanh toán lúc nhận xe: </span>
                    <span className="text-primary font-semibold">
                      {rentalDetail?.paymentType === "payAll"
                        ? "0"
                        : formatCurrency(rentalDetail?.totalPrice * 0.8)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProfileLayout>
  );
};

export default RentalDetail;
