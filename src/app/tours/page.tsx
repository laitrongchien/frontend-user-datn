"use client";

import { useState, useEffect } from "react";
import HorizTourCard from "@/components/card/HorizTourCard";
import Pagination from "@/components/global/Pagination";
import { tourService } from "@/services/api/tour";
import { useAppSelector } from "@/store/hooks";
import Loading from "@/components/global/Loading";

const Tour = () => {
  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        let response;
        setLoading(true);
        if (user)
          response = await tourService.getAllTours(currentPage, 4, user._id);
        else response = await tourService.getAllTours(currentPage, 4);
        setLoading(false);
        const { tours, totalPages } = response.data;
        setTours(tours);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    fetchTours();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div
        className="relative bg-center bg-cover w-full h-[calc(100vh-66px)] p-6 flex flex-col justify-center"
        style={{
          backgroundImage: `url("https://rentabikevn.com/wp-content/uploads/2022/09/crazy-mountains-up-in-northern-Vietnam-scaled.jpg")`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <h1 className="font-sans font-extrabold text-5xl text-white z-10">
          KHÁM PHÁ VIETNAM
        </h1>
        <h3 className="text-2xl text-white mt-8 z-10">Tour motor trọn gói</h3>
      </div>
      {loading ? (
        <div className="w-full h-screen">
          <Loading />
        </div>
      ) : (
        <div className="px-10 flex items-center justify-between flex-wrap">
          {tours.map((tour: any) => (
            <div
              key={tour._id}
              className="mt-20 basis-[48%] max-md:basis-[100%]"
            >
              <HorizTourCard tour={tour} hideHeartIcon={false} />
            </div>
          ))}
        </div>
      )}

      <div className="flex-center mt-6 mb-12">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          route="/tours"
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Tour;
