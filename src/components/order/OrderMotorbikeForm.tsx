"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import axios from "axios";

const OrderMotorbikeForm = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [finishDate, setFinishDate] = useState(new Date());
  const { user } = useAppSelector((state) => state.auth);

  const handleOrderMotorbike = async (event: any) => {
    event.preventDefault();
    const res = await axios.post(
      "http://localhost:8000/api/payment/create-payment-url",
      { amount: 10000 }
    );
    const paymentUrl = res.data;
    window.location.href = paymentUrl;
  };
  return (
    <form
      className="shadow-lg border border-gray-300 px-10 py-4 w-full rounded-lg"
      onSubmit={handleOrderMotorbike}
    >
      <h1 className="text-lg font-semibold text-center">Thuê xe</h1>
      <h1 className="my-2">Ngày nhận</h1>
      <DatePicker
        showIcon
        selected={startDate}
        minDate={new Date()}
        onChange={(date) => date && setStartDate(date)}
        wrapperClassName="border border-gray-200"
      />
      <h1 className="my-2">Ngày trả</h1>
      <DatePicker
        showIcon
        selected={finishDate}
        minDate={startDate}
        onChange={(date) => date && setFinishDate(date)}
        wrapperClassName="border border-gray-200"
      />
      <h1 className="my-2">Số lượng</h1>
      <input
        className="p-1.5 border border-gray-500 rounded-lg w-full"
        placeholder="Số lượng xe"
      />
      <h1 className="text-sm mt-2">Số lượng xe tối đa có thể đặt: 4</h1>
      {true ? (
        <button
          type="submit"
          className="w-full p-1.5 rounded-lg text-white bg-primary mt-6"
        >
          Thanh toán
        </button>
      ) : (
        <div className="flex-center mt-2">
          <Link href={"/auth/login"} className=" text-primary">
            Đăng nhập để đặt xe
          </Link>
        </div>
      )}
    </form>
  );
};

export default OrderMotorbikeForm;
