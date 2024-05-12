"use client";

import ProfileLayout from "@/components/profile/ProfileLayout";
import { useEffect, useState } from "react";
import { bookingTourService } from "@/services/api/booking";
import DataTable from "react-data-table-component";
import { formatCurrency, formatTime } from "@/utils/common";
import Link from "next/link";
import Loading from "@/components/global/Loading";

const BookingOrders = () => {
  const [bookingTours, setBookingTours] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMyBookings = async () => {
      setLoading(true);
      const res = await bookingTourService.getBookingTourByUser();
      setLoading(false);
      setBookingTours(res.data);
    };
    fetchMyBookings();
  }, []);

  const columns = [
    {
      name: "Mã đơn booking",
      selector: (row: any) => row?._id,
      sortable: true,
    },
    {
      name: "Tổng tiền",
      selector: (row: any) => formatCurrency(row?.totalPrice),
      sortable: true,
    },
    {
      name: "Ngày thanh toán",
      selector: (row: any) => formatTime(row?.createdAt),
      sortable: true,
    },
    {
      name: "Trạng thái thanh toán",
      cell: (row: any) => (
        <h1
          className={`
            ${
              row?.paymentType === "payAll" ? "text-success" : "text-primary"
            } font-semibold
          `}
        >
          {row?.paymentType === "payAll"
            ? "Đã thanh toán toàn bộ"
            : "Thanh toán trước 20%"}
        </h1>
      ),
      wrap: true,
    },
    {
      name: "Trạng thái đơn",
      cell: (row: any) => (
        <h1
          className={`
              ${
                row?.status === "completed"
                  ? "text-success"
                  : row?.status === "started"
                  ? "text-blue"
                  : row?.status === "not-started"
                  ? "text-error"
                  : "text-primary"
              } font-semibold
            `}
        >
          {row?.status === "completed"
            ? "Đã hoàn thành"
            : row?.status === "started"
            ? "Đã tham gia"
            : row?.status === "not-started"
            ? "Không tham gia"
            : "Chưa khởi hành"}
        </h1>
      ),
      wrap: true,
    },
    {
      name: "Hành động",
      cell: (row: any) => (
        <Link
          href={`/profile/booking-tour-orders/${row._id}`}
          className=" w-20 py-1 text-base text-primary hover:text-white my-2 hover:bg-primary border border-primary rounded transition-all duration-700 flex-center"
        >
          Chi tiết
        </Link>
      ),
    },
  ];

  const customStyles = {
    rows: {
      style: {
        fontSize: "15px",
        minHeight: "64px",
      },
    },
    headCells: {
      style: {
        fontSize: "15px",
        color: "#ff7a33",
        fontWeight: "600",
      },
    },
  };
  return (
    <ProfileLayout>
      <div className="rounded-lg px-10 py-4 w-[calc(100vw-352px)] h-full bg-white shadow-md flex">
        {loading ? (
          <Loading />
        ) : bookingTours.length === 0 ? (
          <div className="h-full flex-center">
            <span className="text-[18px] font-semibold">
              Danh sách xe đã thuê trống
            </span>
          </div>
        ) : (
          <div className="w-full h-full rounded-lg shadow-sm border border-gray-200">
            <DataTable
              columns={columns}
              data={bookingTours}
              pagination
              paginationRowsPerPageOptions={[5, 10, 15]}
              responsive
              customStyles={customStyles}
            />
          </div>
        )}
      </div>
    </ProfileLayout>
  );
};

export default BookingOrders;
