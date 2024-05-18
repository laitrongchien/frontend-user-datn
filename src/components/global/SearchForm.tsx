"use client";

import { useState } from "react";
import { FaMotorcycle, FaEarthAmericas } from "react-icons/fa6";
import SearchTourForm from "../tour/SearchTourForm";
import SearchMotorbikeForm from "../motorbike/SearchMotorbikeForm";

const SearchForm = () => {
  const [activeForm, setActiveForm] = useState("searchTour");
  return (
    <div className="w-[80%]">
      <div className="flex">
        <button
          className={`h-[50px] w-[50%] md:w-40 bg-white border-b rounded-tl-lg ${
            activeForm === "searchTour" ? "border-primary" : "border-gray-300"
          } flex-center gap-4`}
          onClick={() => setActiveForm("searchTour")}
        >
          <FaEarthAmericas
            size={18}
            color={activeForm === "searchTour" ? "#ff7a33" : "#666"}
          />
          <span
            className={`font-semibold ${
              activeForm === "searchTour" ? "text-primary" : "text-[#666]"
            }`}
          >
            Du lịch
          </span>
        </button>
        <div className="h-[50px] w-[1px] bg-gray-300"></div>
        <button
          className={`h-[50px] w-[50%] md:w-40 bg-white border-b rounded-tr-lg ${
            activeForm === "searchMotor" ? "border-primary" : "border-gray-300"
          } flex-center gap-4`}
          onClick={() => setActiveForm("searchMotor")}
        >
          <FaMotorcycle
            size={22}
            color={activeForm === "searchMotor" ? "#ff7a33" : "#666"}
          />
          <span
            className={`font-semibold ${
              activeForm === "searchMotor" ? "text-primary" : "text-[#666]"
            }`}
          >
            Thuê xe
          </span>
        </button>
      </div>
      <div className="p-8 bg-white border-b-2 border-primary">
        {activeForm === "searchTour" ? (
          <SearchTourForm />
        ) : (
          <SearchMotorbikeForm />
        )}
      </div>
    </div>
  );
};

export default SearchForm;
