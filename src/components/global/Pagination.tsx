"use client";

import { useRouter } from "next/navigation";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const router = useRouter();
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="join">
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`join-item btn ${
            currentPage === number ? "btn-active" : ""
          }`}
          onClick={() => {
            router.push(`/tours?page=${number}`, { scroll: false });
            onPageChange(number);
          }}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
