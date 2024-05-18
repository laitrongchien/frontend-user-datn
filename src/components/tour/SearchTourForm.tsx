"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaCalendarCheck, FaMapMarkerAlt } from "react-icons/fa";
import { startLocationOptions, tourDurationOptions } from "@/constants";

const SearchTourForm = () => {
  const router = useRouter();
  const [startLocation, setStartLocation] = useState("");
  const [tourDuration, setTourDuration] = useState<{
    minDuration: number | undefined;
    maxDuration: number | undefined;
  }>();

  const handleSelectDuration = (e: any) => {
    const selectOption = tourDurationOptions.find(
      (option) => option.value === e.target.value
    );
    setTourDuration({
      minDuration: selectOption?.minDuration,
      maxDuration: selectOption?.maxDuration,
    });
  };

  const hanldeSubmit = (e: any) => {
    e.preventDefault();
    let redirectUrl = "/tours";
    if (startLocation) {
      redirectUrl += `?startLocation=${startLocation}`;
    }
    if (tourDuration) {
      const { minDuration, maxDuration } = tourDuration;
      if (minDuration) {
        redirectUrl += startLocation ? "&" : "?";
        redirectUrl += `minDuration=${minDuration}`;
      }
      if (maxDuration) {
        redirectUrl += `&maxDuration=${maxDuration}`;
      }
    }
    // console.log(redirectUrl);
    router.push(redirectUrl);
  };

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
      onSubmit={hanldeSubmit}
    >
      <div className="relative h-[50px] border border-gray-400 font-medium rounded-lg overflow-hidden">
        <select
          className="w-full h-full outline-none pl-8"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
        >
          <option hidden>Điểm khởi hành</option>
          {startLocationOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
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
          defaultValue=""
          onChange={handleSelectDuration}
        >
          <option hidden>Thời gian chuyến đi</option>
          {tourDurationOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <FaCalendarCheck
          className="absolute left-2 top-[14px]"
          size={20}
          color="#666"
        />
      </div>
      <button
        type="submit"
        className="h-[50px] border border-primary text-primary hover:text-white hover:bg-primary font-medium rounded-lg"
        disabled={!startLocation && !tourDuration}
      >
        Tìm kiếm
      </button>
    </form>
  );
};

export default SearchTourForm;
