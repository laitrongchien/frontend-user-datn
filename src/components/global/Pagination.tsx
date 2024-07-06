"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const Pagination = ({
  currentPage,
  totalPages,
  route,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  route?: string;
  onPageChange: (page: number) => void;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    if (route) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      router.push(`${route}?${params.toString()}`, { scroll: false });
    }
    onPageChange(page);
  };

  return (
    <div className="flex gap-2">
      <button
        className="w-9 h-9 rounded-md bg-[#dfdfdf] flex-center"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaArrowLeftLong color="#444" />
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`w-9 h-9 rounded-md ${
            currentPage === number ? "bg-primary text-white" : "bg-[#dfdfdf]"
          }`}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </button>
      ))}
      <button
        className="w-9 h-9 rounded-md bg-[#dfdfdf] flex-center"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FaArrowRightLong color="#444" />
      </button>
    </div>
  );
};

export default Pagination;
