"use client";

import { useState, useEffect } from "react";
import MotorbikeCard from "@/components/card/MotorbikeCard";
import Pagination from "@/components/global/Pagination";
import { motorbikeService } from "@/services/api/motorbike";
import { useAppSelector } from "@/store/hooks";
import Loading from "@/components/global/Loading";

const Motorbike = () => {
  const [motorbikes, setMotorbikes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [type, setType] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState<undefined | number>(1);
  const [loading, setLoading] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  const handleSortMotorbike = (e: any) => {
    const value = e.target.value;
    let sortField, sortOrder;
    switch (value) {
      case "order":
        sortField = "";
        sortOrder = undefined;
        break;
      case "increase-price":
        sortField = "price";
        sortOrder = 1;
        break;
      case "decrease-price":
        sortField = "price";
        sortOrder = -1;
        break;
      case "decrease-rating":
        sortField = "ratingsAverage";
        sortOrder = -1;
        break;
      default:
        sortField = "";
    }
    setSortField(sortField);
    setSortOrder(sortOrder);
  };

  const handleFilterType = (e: any) => {
    const value = e.target.value;
    switch (value) {
      case "all":
        setType("");
        break;
      case "semi-automatic":
        setType("semi-automatic");
        break;
      case "automatic":
        setType("automatic");
        break;
      case "manual":
        setType("manual");
        break;
    }
  };

  useEffect(() => {
    const fetchMotorbikes = async () => {
      try {
        let response;
        setLoading(true);
        if (user)
          response = await motorbikeService.getAllMotorbikes(
            currentPage,
            6,
            user._id,
            type,
            sortField,
            sortOrder
          );
        else
          response = await motorbikeService.getAllMotorbikes(
            currentPage,
            6,
            undefined,
            type,
            sortField,
            sortOrder
          );
        setLoading(false);
        const { motorbikes, totalPages } = response.data;
        setMotorbikes(motorbikes);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching motorbikes:", error);
      }
    };

    fetchMotorbikes();
  }, [currentPage, user, type, sortField, sortOrder]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div
        className="relative bg-center bg-cover w-full h-[calc(100vh-66px)] p-6 flex flex-col justify-center"
        style={{
          backgroundImage: `url("https://rentabikevn.com/wp-content/uploads/2023/03/Rentabike-Vietnam-Honda-CB500x-Front-left-2048x1153.jpg")`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <h1 className="font-sans font-extrabold text-5xl text-white z-10">
          THUÊ XE MOTOR
        </h1>
      </div>
      <div className="px-10 mt-8">
        <select
          className="p-1 border border-primary outline-none rounded-md w-60"
          onChange={handleSortMotorbike}
        >
          <option value="order">Xếp theo</option>
          <option value="increase-price">Giá thấp đến cao</option>
          <option value="decrease-price">Giá cao đến thấp</option>
          <option value="decrease-rating">Đánh giá cao đến thấp</option>
        </select>
        <select
          className="p-1 border border-primary outline-none rounded-md w-60 ml-8"
          onChange={handleFilterType}
        >
          <option value="all">Tất cả</option>
          <option value="semi-automatic">Xe số</option>
          <option value="automatic">Xe ga</option>
          <option value="manual">Xe tay côn</option>
        </select>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="px-10 flex items-center justify-between flex-wrap mt-[-24px]">
          {motorbikes.map((motorbike: any) => (
            <div
              key={motorbike._id}
              className="mt-20 basis-[50%] max-md:basis-[100%]"
            >
              <MotorbikeCard motorbike={motorbike} hideHeartIcon={false} />
            </div>
          ))}
        </div>
      )}
      <div className="flex-center mt-6 mb-12">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          route="/motorbikes"
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Motorbike;
