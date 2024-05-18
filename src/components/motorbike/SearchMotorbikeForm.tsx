"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { typeMotorOptions } from "@/constants";
import { FaMapMarkerAlt, FaMotorcycle } from "react-icons/fa";

const SearchMotorbikeForm = () => {
  const router = useRouter();
  const [typeMotorbike, setTypeMotorbike] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push(`/motorbikes?type=${typeMotorbike}`);
  };

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
      onSubmit={handleSubmit}
    >
      <div className="relative h-[50px] border border-gray-400 font-medium rounded-lg overflow-hidden">
        <select className="w-full h-full outline-none pl-8">
          <option selected>Số 10 Hoàn Kiếm, Hà Nội</option>
        </select>
        <FaMapMarkerAlt
          className="absolute left-2 top-[14px]"
          size={20}
          color="#666"
        />
      </div>
      <div className="relative h-[50px] border border-gray-400 font-medium rounded-lg overflow-hidden">
        <select
          className="w-full h-full outline-none pl-8"
          value={typeMotorbike}
          onChange={(e) => setTypeMotorbike(e.target.value)}
        >
          <option hidden>Phân loại xe</option>
          {typeMotorOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <FaMotorcycle
          className="absolute left-2 top-[14px]"
          size={22}
          color="#666"
        />
      </div>
      <button
        type="submit"
        className="h-[50px] border border-primary text-primary hover:text-white hover:bg-primary font-medium rounded-lg"
        disabled={!typeMotorbike}
      >
        Tìm kiếm
      </button>
    </form>
  );
};

export default SearchMotorbikeForm;
