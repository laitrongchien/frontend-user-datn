"use client";

import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { paymentService } from "@/services/api/payment";
import { formatCurrency } from "@/utils/common";
import { setRentalData } from "@/utils/storage";
import { motorbikeService } from "@/services/api/motorbike";
import { DEFAULT_LOCATION } from "@/constants";
import { locationService } from "@/services/api/location";

const RentMotorbikeForm = ({
  motorbikeId,
  motorbikePrice,
}: {
  motorbikeId: string;
  motorbikePrice: number;
}) => {
  const [startDate, setStartDate] = useState(
    new Date(Date.now() + 24 * 60 * 60 * 1000)
  );
  const [finishDate, setFinishDate] = useState(
    new Date(startDate.getTime() + 24 * 60 * 60 * 1000)
  );
  const [numMotorbikes, setNumMotorbikes] = useState(0);
  const [phone, setPhone] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentType, setPaymentType] = useState("payAll");
  const [availableMotors, setAvailableMotors] = useState([]);
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [locations, setLocations] = useState([]);
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const days = Math.ceil(
      (finishDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    setTotalPrice(days * numMotorbikes * motorbikePrice);
  }, [numMotorbikes, startDate, finishDate, motorbikePrice]);

  useEffect(() => {
    const fetchAllAvailableMotor = async () => {
      const res = await motorbikeService.getAllAvailableMotor(
        motorbikeId,
        location
      );
      setAvailableMotors(res.data);
    };
    fetchAllAvailableMotor();
  }, [location, motorbikeId]);

  console.log(availableMotors);

  useEffect(() => {
    const getAllLocations = async () => {
      const res = await locationService.getAllLocations();
      setLocations(res.data);
    };
    getAllLocations();
  }, []);

  const handleRentMotorbike = async (event: any) => {
    event.preventDefault();
    const amount = paymentType === "payAll" ? totalPrice : 0.2 * totalPrice;
    const res = await paymentService.createPaymentUrl(amount * 1000);
    const paymentUrl = res.data;
    window.location.href = paymentUrl;
    const temporaryRentalData = {
      user: user._id,
      phone: phone,
      motorbikes: [
        {
          motorbike: motorbikeId,
          startDate: startDate,
          finishDate: finishDate,
          numMotorbikes: numMotorbikes,
        },
      ],
      location: location,
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
            selected={startDate}
            minDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
            maxDate={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => date && setStartDate(date)}
            wrapperClassName="border border-gray-200"
          />
        </div>
        <div className="my-2 basis-[46%]">
          <h1>Ngày trả</h1>
          <DatePicker
            selected={finishDate}
            minDate={new Date(startDate.getTime() + 24 * 60 * 60 * 1000)}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => date && setFinishDate(date)}
            wrapperClassName="border border-gray-200"
          />
        </div>
      </div>
      <div>
        <span>Địa điểm nhận xe</span>
        <select
          className="p-1.5 border border-gray-500 rounded-lg outline-none w-full"
          required
          value={location}
          onChange={(e: any) => setLocation(e.target.value)}
        >
          {locations.map((location: any) => (
            <option key={location._id} value={location.address}>
              {location.address}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="my-2 basis-[46%]">
          <h1>SĐT liên hệ</h1>
          <input
            className="p-1.5 border border-gray-500 rounded-lg w-full placeholder:text-gray-600 outline-none"
            placeholder="Số điện thoại"
            required
            value={phone}
            onChange={(e: any) => setPhone(e.target.value)}
          />
        </div>
        <div className="my-2 basis-[46%]">
          <h1>Số lượng</h1>
          <input
            className="p-1.5 border border-gray-500 rounded-lg w-full placeholder:text-gray-600 outline-none"
            placeholder="Số lượng xe"
            type="number"
            min="0"
            value={numMotorbikes}
            onChange={(e: any) => setNumMotorbikes(parseInt(e.target.value))}
          />
        </div>
      </div>

      <p
        className={`text-sm mt-2 font-semibold ${
          numMotorbikes > availableMotors.length && "text-error"
        }`}
      >
        Số lượng xe sẵn có: {availableMotors.length}
      </p>
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
        className="flex px-4 py-2 border rounded-lg border-gray-400 justify-between mt-2 mb-2"
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
      <label htmlFor="policyAcceptance" className="flex items-center mb-2">
        <input
          type="checkbox"
          id="policyAcceptance"
          checked={isPolicyAccepted}
          onChange={(e) => setIsPolicyAccepted(e.target.checked)}
          className="mr-2"
        />
        <span>
          Tôi đồng ý với các{" "}
          <Link href="/policies" className="underline">
            <span>chính sách</span>
          </Link>{" "}
          của motor24h.vn
        </span>
      </label>
      {user ? (
        <button
          type="submit"
          className={`w-full p-1.5 rounded-lg text-white ${
            isPolicyAccepted &&
            numMotorbikes > 0 &&
            numMotorbikes <= availableMotors.length
              ? "bg-primary"
              : "bg-[#c4c4c4] cursor-not-allowed"
          }`}
        >
          Thanh toán
        </button>
      ) : (
        <div className="flex-center mt-2">
          <Link href={"/auth/login"} className=" text-primary">
            Đăng nhập để thuê xe
          </Link>
        </div>
      )}
    </form>
  );
};

export default RentMotorbikeForm;
