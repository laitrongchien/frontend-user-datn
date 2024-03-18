"use client";

import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

import { MdError } from "react-icons/md";
import { useEffect } from "react";
import { motorbikeService } from "@/services/api/motorbike";
import {
  getBookingData,
  removeBookingData,
  getRentalData,
  removeRentalData,
} from "@/utils/storage";
import { useSearchParams } from "next/navigation";
import { bookingTourService } from "@/services/api/booking";

const PaymentResult = () => {
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("vnp_TransactionStatus");
  const rentalData = getRentalData();
  const bookingTourData = getBookingData();

  useEffect(() => {
    const createRental = async () => {
      try {
        await motorbikeService.createRentalMotorbike(rentalData);
      } catch (error) {
        console.error("Error creating rental:", error);
      } finally {
        removeRentalData();
      }
    };

    const createBookingTour = async () => {
      try {
        await bookingTourService.createBookingTour(bookingTourData);
      } catch (error) {
        console.error("Error creating booking tour:", error);
      } finally {
        removeBookingData();
      }
    };

    if (paymentStatus === "00" && rentalData) createRental();
    if (paymentStatus === "00" && bookingTourData) createBookingTour();
  }, [paymentStatus, rentalData, bookingTourData]);

  return (
    <div className="flex-center h-[calc(100vh-66px)]">
      <div>
        <div className="flex-center">
          {paymentStatus === "00" ? (
            <FaCheckCircle size={40} color="green" />
          ) : (
            <MdError size={48} color="red" />
          )}
        </div>
        {paymentStatus === "00" ? (
          <h1 className="text-4xl font-semibold text-green-600 mt-4">
            Giao dịch thành công
          </h1>
        ) : (
          <h1 className="text-4xl font-semibold text-[#ff1f1f] mt-4">
            Giao dịch thất bại
          </h1>
        )}

        <Link
          href={"/"}
          className="py-2 border text-primary border-primary rounded-lg w-full block text-center mt-12"
        >
          Trở về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default PaymentResult;
