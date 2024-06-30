import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { formatCurrency, formatDate } from "@/utils/common";
import { setBookingData } from "@/utils/storage";
import { paymentService } from "@/services/api/payment";

const BookingTourForm = ({ tour }: { tour: any }) => {
  const [numberPeople, setNumberPeople] = useState(1);
  const [phone, setPhone] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentType, setPaymentType] = useState("payAll");
  const { user } = useAppSelector((state) => state.auth);

  const handleBookTour = async (event: any) => {
    event.preventDefault();
    const amount = paymentType === "payAll" ? totalPrice : 0.2 * totalPrice;
    const res = await paymentService.createPaymentUrl(amount * 1000);
    const paymentUrl = res.data;
    window.location.href = paymentUrl;
    const bookData = {
      tour: tour?._id,
      user: user._id,
      phone,
      startDate: tour?.startDate,
      numberPeople,
      paymentType,
      totalPrice,
    };
    setBookingData(bookData);
  };

  useEffect(() => {
    setTotalPrice(numberPeople * tour?.price);
  }, [numberPeople, tour?.price]);

  return (
    <form
      className="py-2 px-6 border border-gray-400 rounded-lg mt-4"
      onSubmit={handleBookTour}
    >
      <div className="mt-2">
        <h1>Số điện thoại liên hệ</h1>
        <input
          className="p-1.5 border border-gray-400 rounded-lg w-full placeholder:text-gray-600 outline-none"
          value={phone}
          onChange={(e: any) => setPhone(e.target.value)}
          placeholder="Số điện thoại của bạn"
          required
        />
      </div>
      <div className="mt-2">
        <h1>
          Ngày khởi hành:{" "}
          <span className="font-semibold">{formatDate(tour?.startDate)}</span>
        </h1>
        {/* <select
          className="p-1.5 border border-gray-400 rounded-lg w-full placeholder:text-gray-600 outline-none"
          value={startDate}
          onChange={(e: any) => setStartDate(e.target.value)}
          required
        >
          <option hidden value="">
            Chọn ngày khởi hành
          </option>
          {tour?.startDates?.map((date: any, index: any) => (
            <option key={index} value={date}>
              {formatDate(date)}
            </option>
          ))}
        </select> */}
      </div>
      <div className="mt-2">
        <h1>Số người tham gia</h1>
        <input
          className="p-1.5 border border-gray-400 rounded-lg w-full placeholder:text-gray-600 outline-none"
          type="number"
          min={1}
          required
          value={numberPeople}
          onChange={(e: any) => setNumberPeople(parseInt(e.target.value))}
        />
      </div>
      <p
        className={`mt-2 ${
          numberPeople > tour?.availableRemain && "text-error"
        }`}
      >
        Số lượng chỗ tham gia còn lại:{" "}
        <span className="font-semibold">{tour?.availableRemain}</span>
      </p>
      <div className="mt-2">
        <h1>Lưu ý</h1>
        <textarea
          rows={3}
          cols={50}
          className="w-full border border-gray-400 outline-none px-1"
        ></textarea>
      </div>
      <p className="mt-2">
        Giá book tour cho 1 người:{" "}
        <span className="text-primary font-semibold">
          {formatCurrency(tour?.price)}
        </span>
      </p>
      <p className="my-2">
        Tổng số tiền:{" "}
        <span className="text-primary font-semibold">
          {formatCurrency(totalPrice)}
        </span>
      </p>
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
          className={`w-full p-1.5 rounded-lg text-white ${
            numberPeople <= tour?.availableRemain
              ? "bg-primary"
              : "bg-[#c4c4c4] cursor-not-allowed"
          } mb-4`}
        >
          Thanh toán
        </button>
      ) : (
        <div className="flex-center mt-2">
          <Link href={"/auth/login"} className=" text-primary">
            Đăng nhập để đặt tour xe motor
          </Link>
        </div>
      )}
    </form>
  );
};

export default BookingTourForm;
