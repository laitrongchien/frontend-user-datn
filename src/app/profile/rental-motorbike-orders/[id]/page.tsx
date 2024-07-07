"use client";

import Link from "next/link";
import Image from "next/image";
import Loading from "@/components/global/Loading";
import { rentalService } from "@/services/api/rental";
import { useState, useEffect } from "react";
import { formatCurrency, formatDate } from "@/utils/common";
import ProfileLayout from "@/components/profile/ProfileLayout";
import { MdArrowBackIos } from "react-icons/md";
import { toast } from "react-toastify";

const RentalDetail = ({ params }: { params: { id: string } }) => {
  const [rentalDetail, setRentalDetail] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const rentalId = params.id;
  useEffect(() => {
    if (rentalId) {
      const fetchRentalDetail = async () => {
        setLoading(true);
        const res = await rentalService.getMotorbikeRentalDetail(rentalId);
        setLoading(false);
        setRentalDetail(res.data);
        if (res.data.createdAt) {
          const createdAt = new Date(res.data.createdAt).getTime();
          const now = new Date().getTime();
          const timeDiff = createdAt + 24 * 60 * 60 * 1000 - now;
          setTimeLeft(timeDiff > 0 ? timeDiff : 0);
        }
      };
      fetchRentalDetail();
    }
  }, [rentalId]);

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          const newTimeLeft = prevTimeLeft - 1000;
          return newTimeLeft > 0 ? newTimeLeft : 0;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timeLeft]);

  const formatTimeLeft = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h:${minutes}m:${seconds}s`;
  };

  const handleCancelRental = async () => {
    try {
      await rentalService.cancelRentalOrder(rentalId);
      toast.success("Yêu cầu hủy đơn thành công");
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

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
                  key={data?._id}
                  className="flex py-6 border-b border-gray-200 justify-between"
                >
                  <div className="flex">
                    <Image
                      src={
                        data.motorbike?.image || data.motorbikeHistory?.image
                      }
                      alt="img1"
                      width={279}
                      height={175}
                      className="w-72 h-48 object-cover max-md:w-full max-md:h-auto border border-gray-300"
                    />
                    <div className="ml-16">
                      <h1 className="text-xl font-semibold">
                        {data.motorbike?.name || data.motorbikeHistory?.name}
                      </h1>
                      <h1>
                        Giá thuê:{" "}
                        <span className="text-primary">
                          {formatCurrency(
                            data.motorbike?.price ||
                              data.motorbikeHistory?.price
                          )}
                        </span>
                        /ngày
                      </h1>
                      <p>Ngày nhận: {formatDate(data.startDate)}</p>
                      <p>Ngày trả: {formatDate(data.finishDate)}</p>
                      <p>Số lượng xe thuê: {data.numMotorbikes}</p>
                    </div>
                  </div>
                  <p>
                    Tổng tiền thuê:{" "}
                    <span className="text-primary">
                      {formatCurrency(
                        data.motorbike?.price ||
                          data.motorbikeHistory?.price * data.numMotorbikes
                      )}
                    </span>
                  </p>
                </div>
              ))}
              <div className="flex justify-between mt-4">
                <div
                  className={`${
                    rentalDetail?.status === "cancel" && "invisible"
                  }`}
                >
                  <p>
                    Thời gian còn lại để hủy đơn: {formatTimeLeft(timeLeft)}
                  </p>
                  <button
                    className={`mt-4 px-4 py-2 ${
                      timeLeft > 0
                        ? "bg-red-500 text-white"
                        : "bg-[#c4c4c4] cursor-not-allowed"
                    } rounded`}
                    onClick={() => setIsModalOpen(true)}
                  >
                    Hủy đơn
                  </button>
                </div>
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
                  {rentalDetail?.status === "cancel" && (
                    <p className="flex justify-between">
                      <span>Hoàn tiền:</span>
                      <span className="text-success font-semibold">
                        {rentalDetail?.paymentType === "payAll"
                          ? formatCurrency(rentalDetail?.totalPrice)
                          : formatCurrency(rentalDetail?.totalPrice * 0.2)}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Xác nhận hủy đơn</h3>
            <p className="py-4">
              Bạn có chắc chắn muốn hủy đơn thuê xe này không? Hãy chắc chắn
              rằng bạn đã đọc kỹ các điều khoản của chúng tôi. Sau khi kiếm tra,
              chúng tôi sẽ hoàn tiền cho bạn sau ít nhất 3 ngày làm việc
            </p>
            <div className="modal-action">
              <button
                className="text-white bg-red-500 p-2 rounded-md"
                onClick={handleCancelRental}
              >
                Xác nhận hủy
              </button>
              <button
                className="bg-[#c4c4c4] p-2 rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </ProfileLayout>
  );
};

export default RentalDetail;
