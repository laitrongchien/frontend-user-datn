"use client";

import { useRouter } from "next/navigation";

const Pagination = ({
  currentPage,
  totalPages,
  route,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  route: string;
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
            router.push(`${route}?page=${number}`, { scroll: false });
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
