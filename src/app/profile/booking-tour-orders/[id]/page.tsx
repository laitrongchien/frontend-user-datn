"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdArrowBackIos } from "react-icons/md";
import { formatCurrency, formatDate } from "@/utils/common";
import { bookingTourService } from "@/services/api/booking";
import Loading from "@/components/global/Loading";
import ProfileLayout from "@/components/profile/ProfileLayout";
import { toast } from "react-toastify";

const TourBookingDetail = ({ params }: { params: { id: string } }) => {
  const [bookingTour, setBookingTour] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bookingTourId = params.id;

  useEffect(() => {
    if (bookingTourId) {
      const fetchBookingTourDetail = async () => {
        setLoading(true);
        const res = await bookingTourService.getBookingTourById(bookingTourId);
        setLoading(false);
        setBookingTour(res.data);
        if (res.data.createdAt) {
          const createdAt = new Date(res.data.createdAt).getTime();
          const now = new Date().getTime();
          const timeDiff = createdAt + 24 * 60 * 60 * 1000 - now;
          setTimeLeft(timeDiff > 0 ? timeDiff : 0);
        }
      };
      fetchBookingTourDetail();
    }
  }, [bookingTourId]);

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

  const handleCancelBooking = async () => {
    try {
      await bookingTourService.cancelBookingTour(bookingTourId);
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
              href={"/profile/booking-tour-orders"}
              className="flex items-center gap-2"
            >
              <MdArrowBackIos />
              <span>Quay lại</span>
            </Link>
            <div className="border-b border-gray-200 pb-6">
              <h1 className="text-lg font-semibold">
                Chi tiết đơn đặt tour {bookingTourId}
              </h1>
            </div>
            <div className="mt-8 flex justify-between">
              {bookingTour && (
                <Image
                  src={
                    bookingTour?.tour?.imageCover ||
                    bookingTour?.tourHistory?.imageCover
                  }
                  alt="tour-img"
                  width={768}
                  height={375}
                  className="w-80 h-52 object-cover rounded-lg"
                />
              )}

              <div>
                <h1 className="text-lg font-semibold text-right">
                  {bookingTour?.tour?.name || bookingTour?.tourHistory?.name}
                </h1>
                <p className="py-1 text-right">
                  Giá:{" "}
                  {formatCurrency(
                    bookingTour?.tour?.price || bookingTour?.tourHistory?.price
                  )}
                  / người
                </p>
                <p className="py-1 text-right">
                  Số lượng người: {bookingTour?.numberPeople}
                </p>
                <p className="py-1 text-right">
                  Ngày khởi hành: {formatDate(bookingTour?.startDate)}
                </p>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <div
                className={`${bookingTour?.status === "cancel" && "invisible"}`}
              >
                <p>Thời gian còn lại để hủy đơn: {formatTimeLeft(timeLeft)}</p>
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
                    {formatCurrency(bookingTour?.totalPrice)}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span>Đã thanh toán:</span>
                  <span className="text-primary font-semibold">
                    {bookingTour?.paymentType === "payAll"
                      ? formatCurrency(bookingTour?.totalPrice)
                      : formatCurrency(bookingTour?.totalPrice * 0.2)}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span>Thanh toán lúc nhận xe: </span>
                  <span className="text-primary font-semibold">
                    {bookingTour?.paymentType === "payAll"
                      ? "0"
                      : formatCurrency(bookingTour?.totalPrice * 0.8)}
                  </span>
                </p>
                {bookingTour?.status === "cancel" && (
                  <p className="flex justify-between">
                    <span>Hoàn tiền:</span>
                    <span className="text-success font-semibold">
                      {bookingTour?.paymentType === "payAll"
                        ? formatCurrency(bookingTour?.totalPrice)
                        : formatCurrency(bookingTour?.totalPrice * 0.2)}
                    </span>
                  </p>
                )}
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
              Bạn có chắc chắn muốn hủy đơn đặt tour này không? Hãy chắc chắn
              rằng bạn đã đọc kỹ các điều khoản của chúng tôi. Sau khi kiếm tra,
              chúng tôi sẽ hoàn tiền cho bạn sau ít nhất 3 ngày làm việc
            </p>
            <div className="modal-action">
              <button
                className="text-white bg-red-500 p-2 rounded-md"
                onClick={handleCancelBooking}
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

export default TourBookingDetail;
