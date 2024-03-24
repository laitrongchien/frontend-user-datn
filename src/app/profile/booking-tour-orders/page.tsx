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
      name: "Trạng thái",
      selector: (row: any) =>
        row?.paymentType === "payAll" ? "Thanh toán toàn bộ" : "Thanh toán 20%",
    },
    {
      name: "Ngày thanh toán",
      selector: (row: any) => formatTime(row?.createdAt),
      sortable: true,
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
      <div className="rounded-lg px-10 py-4 w-[calc(100vw-352px)] bg-white shadow-md flex min-h-[300px]">
        <div className="w-full h-full rounded-lg shadow-sm border border-gray-100">
          {loading ? (
            <Loading />
          ) : (
            <DataTable
              columns={columns}
              data={bookingTours}
              pagination
              paginationRowsPerPageOptions={[5, 10, 15]}
              responsive
              customStyles={customStyles}
            />
          )}
        </div>
      </div>
    </ProfileLayout>
  );
};

export default BookingOrders;
