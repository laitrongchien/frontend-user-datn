"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { typeMotorOptions } from "@/constants";
import { FaMapMarkerAlt, FaMotorcycle } from "react-icons/fa";
import { locationService } from "@/services/api/location";

const SearchMotorbikeForm = () => {
  const router = useRouter();
  const [typeMotorbike, setTypeMotorbike] = useState("");
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState();

  useEffect(() => {
    const getAllLocations = async () => {
      const res = await locationService.getAllLocations();
      setLocations(res.data);
    };
    getAllLocations();
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push(`/motorbikes?location=${location}&type=${typeMotorbike}`);
  };

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
      onSubmit={handleSubmit}
    >
      <div className="relative h-[50px] border border-gray-400 font-medium rounded-lg overflow-hidden">
        <select
          className="w-full h-full outline-none pl-8"
          value={location}
          onChange={(e: any) => setLocation(e.target.value)}
        >
          <option hidden>Điểm nhận xe</option>
          {locations.map((location: any) => (
            <option key={location._id} value={location.address}>
              {location.address}
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
        disabled={!typeMotorbike || !location}
      >
        Tìm kiếm
      </button>
    </form>
  );
};

export default SearchMotorbikeForm;
