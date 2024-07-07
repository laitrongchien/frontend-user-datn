"use client";

import ProfileLayout from "@/components/profile/ProfileLayout";
import { useEffect, useState } from "react";
import { rentalService } from "@/services/api/rental";
import DataTable from "react-data-table-component";
import { formatCurrency, formatDate } from "@/utils/common";
import Link from "next/link";
import Loading from "@/components/global/Loading";

const RentalMotorbikes = () => {
  const [motorbikeRentals, setMotorbikeRentals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMyRentals = async () => {
      setLoading(true);
      const res = await rentalService.getMotorbikeRentalsByUser();
      setLoading(false);
      setMotorbikeRentals(res.data);
    };
    fetchMyRentals();
  }, []);

  const columns = [
    {
      name: "Mã đơn thuê",
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
      selector: (row: any) => formatDate(row?.createdAt),
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
              row?.status === "returned"
                ? "text-success"
                : row?.status === "received"
                ? "text-blue"
                : row?.status === "not-received" || row?.status === "cancel"
                ? "text-error"
                : "text-primary"
            } font-semibold
          `}
        >
          {row?.status === "returned"
            ? "Đã trả xe"
            : row?.status === "received"
            ? "Đã nhận xe"
            : row?.status === "not-received"
            ? "Không nhận xe"
            : row?.status === "cancel"
            ? "Hủy đơn thuê"
            : "Chờ nhận xe"}
        </h1>
      ),
      wrap: true,
    },
    {
      name: "Hành động",
      cell: (row: any) => (
        <Link
          href={`/profile/rental-motorbike-orders/${row._id}`}
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
      <div className="rounded-lg px-10 py-4 md:w-[calc(100vw-352px)] h-full bg-white shadow-md flex">
        {loading ? (
          <Loading />
        ) : motorbikeRentals.length === 0 ? (
          <div className="w-full h-full flex-center">
            <span className="text-[18px] font-semibold">
              Danh sách tour đã đặt trống
            </span>
          </div>
        ) : (
          <div className="w-full h-full rounded-lg shadow-sm border border-gray-200">
            <DataTable
              columns={columns}
              data={motorbikeRentals}
              responsive
              pagination
              paginationRowsPerPageOptions={[5, 10, 15]}
              customStyles={customStyles}
            />
          </div>
        )}
      </div>
    </ProfileLayout>
  );
};

export default RentalMotorbikes;
