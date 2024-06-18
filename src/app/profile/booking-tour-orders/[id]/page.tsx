"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdArrowBackIos } from "react-icons/md";
import { formatCurrency, formatTime } from "@/utils/common";
import { bookingTourService } from "@/services/api/booking";
import Loading from "@/components/global/Loading";
import ProfileLayout from "@/components/profile/ProfileLayout";

const TourBookingDetail = ({ params }: { params: { id: string } }) => {
  const [bookingTour, setBookingTour] = useState<any>();
  const [loading, setLoading] = useState(false);
  const bookingTourId = params.id;

  useEffect(() => {
    if (bookingTourId) {
      const fetchBookingTourDetail = async () => {
        setLoading(true);
        const res = await bookingTourService.getBookingTourById(bookingTourId);
        setLoading(false);
        setBookingTour(res.data);
      };
      fetchBookingTourDetail();
    }
  }, [bookingTourId]);

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
                  src={bookingTour?.tour.imageCover}
                  alt="tour-img"
                  width={768}
                  height={375}
                  className="w-80 h-52 object-cover rounded-lg"
                />
              )}

              <div>
                <h1 className="text-lg font-semibold">
                  {bookingTour?.tour.name}
                </h1>
                <p className="py-1 text-right">
                  Giá: {formatCurrency(bookingTour?.tour.price)}/ người
                </p>
                <p className="py-1 text-right">
                  Số lượng người: {bookingTour?.numberPeople}
                </p>
                <p className="py-1 text-right">
                  Ngày khởi hành: {formatTime(bookingTour?.startDate)}
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-4">
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
              </div>
            </div>
          </div>
        )}
      </div>
    </ProfileLayout>
  );
};

export default TourBookingDetail;
