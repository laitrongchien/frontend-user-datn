"use client";

import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { MdError } from "react-icons/md";

const PaymentResult = () => {
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("vnp_TransactionStatus");

  return (
    <div className="flex-center mt-[10%]">
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
