"use client";

import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { paymentService } from "@/services/api/payment";
import { formatCurrency } from "@/utils/common";
import { setRentalData } from "@/utils/storage";

const RentMotorbikeForm = ({
  motorbikeId,
  motorbikePrice,
}: {
  motorbikeId: string;
  motorbikePrice: number;
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [finishDate, setFinishDate] = useState(new Date());
  const [numMotorbikes, setNumMotorbikes] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentType, setPaymentType] = useState("payAll");
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const days = Math.ceil(
      (finishDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    setTotalPrice(days * numMotorbikes * motorbikePrice);
  }, [numMotorbikes, startDate, finishDate, motorbikePrice]);

  const handleRentMotorbike = async (event: any) => {
    event.preventDefault();
    const amount = paymentType === "payAll" ? totalPrice : 0.2 * totalPrice;
    const res = await paymentService.createPaymentUrl(amount * 1000);
    const paymentUrl = res.data;
    window.location.href = paymentUrl;
    const temporaryRentalData = {
      user: user._id,
      motorbikes: [
        {
          motorbike: motorbikeId,
          startDate: startDate,
          finishDate: finishDate,
          numMotorbikes: numMotorbikes,
        },
      ],
      paymentType: paymentType,
      totalPrice: totalPrice,
    };
    setRentalData(temporaryRentalData);
  };
  return (
    <form
      className="shadow-lg border border-gray-300 px-10 py-4 w-full rounded-lg"
      onSubmit={handleRentMotorbike}
    >
      <h1 className="text-lg font-semibold text-center">Thuê xe</h1>
      <div className="flex justify-between">
        <div className="my-2 basis-[46%]">
          <h1>Ngày nhận</h1>
          <DatePicker
            showIcon
            selected={startDate}
            minDate={new Date()}
            onChange={(date) => date && setStartDate(date)}
            wrapperClassName="border border-gray-200"
          />
        </div>
        <div className="my-2 basis-[46%]">
          <h1>Ngày trả</h1>
          <DatePicker
            showIcon
            selected={finishDate}
            minDate={startDate}
            onChange={(date) => date && setFinishDate(date)}
            wrapperClassName="border border-gray-200"
          />
        </div>
      </div>
      <h1 className="my-2">Số lượng</h1>
      <input
        className="p-1.5 border border-gray-500 rounded-lg w-full placeholder:text-gray-600 outline-none"
        placeholder="Số lượng xe"
        type="number"
        min="1"
        max="4"
        value={numMotorbikes}
        onChange={(e: any) => setNumMotorbikes(e.target.value)}
      />
      <h1 className="text-sm mt-2">Số lượng xe tối đa có thể đặt: 4</h1>
      <div className="my-3">
        <span>Giá thuê một ngày: </span>
        <span className="font-semibold text-primary">
          {formatCurrency(motorbikePrice)}
        </span>
      </div>
      <div className="mb-2">
        <span>Tổng số tiền: </span>
        <span className="font-semibold text-primary">
          {formatCurrency(totalPrice)}
        </span>
      </div>
      {/* <input type="radio" id="vnpay" value="vnpay" defaultChecked />
      <label htmlFor="vnpay" className="ml-2">
        Thanh toán qua VNPay
      </label> */}
      <label
        htmlFor="payAll"
        className="flex px-4 py-2 border rounded-lg border-gray-400 justify-between"
      >
        <div className="flex">
          <input
            type="radio"
            id="payAll"
            value="payAll"
            checked={paymentType === "payAll"}
            onChange={(e) => setPaymentType(e.target.value)}
          />
          <p className="ml-2">Thanh toán toàn bộ qua VNPay</p>
        </div>
        <p className="font-semibold text-primary">
          {formatCurrency(totalPrice)}
        </p>
      </label>
      <label
        htmlFor="payPart"
        className="flex px-4 py-2 border rounded-lg border-gray-400 justify-between mt-2 mb-4"
      >
        <div className="flex">
          <input
            type="radio"
            id="payPart"
            value="payPart"
            checked={paymentType === "payPart"}
            onChange={(e) => setPaymentType(e.target.value)}
          />
          <p className="ml-2">Thanh toán trước 20% qua VNPay</p>
        </div>
        <p className="font-semibold text-primary">
          {formatCurrency(totalPrice * 0.2)}
        </p>
      </label>
      {user ? (
        <button
          type="submit"
          className="w-full p-1.5 rounded-lg text-white bg-primary"
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

export default RentMotorbikeForm;
