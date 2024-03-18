"use client";

import ProfileLayout from "@/components/profile/ProfileLayout";
import { useEffect, useState } from "react";
import { motorbikeService } from "@/services/api/motorbike";
import DataTable from "react-data-table-component";
import { formatCurrency, formatTime } from "@/utils/common";
import Link from "next/link";
import Loading from "@/components/global/Loading";

const RentalMotorbikes = () => {
  const [motorbikeRentals, setMotorbikeRentals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMyRentals = async () => {
      setLoading(true);
      const res = await motorbikeService.getMotorbikeRentalsByUser();
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
      <div className="rounded-lg px-10 py-4 w-full bg-white shadow-md flex min-h-[300px]">
        <div className="w-full h-full">
          {loading ? (
            <Loading />
          ) : (
            <DataTable
              columns={columns}
              data={motorbikeRentals}
              pagination
              responsive
              title="Đơn thuê xe"
              customStyles={customStyles}
            />
          )}
        </div>
      </div>
    </ProfileLayout>
  );
};

export default RentalMotorbikes;
