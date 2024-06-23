"use client";

import { tourService } from "@/services/api/tour";
import { useEffect, useState } from "react";
import ProfileLayout from "@/components/profile/ProfileLayout";
import MapTracking from "@/components/map/MapTracking";
import Loading from "@/components/global/Loading";
import Link from "next/link";
import { MdArrowBackIos } from "react-icons/md";

const SelfTourDetail = ({ params }: { params: { id: string } }) => {
  const selfTourId = params.id;
  const [selfTourDetail, setSelfTourDetail] = useState<any>();
  const [distance, setDistance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selfTourId) {
      const fetchSelfTourDetail = async () => {
        setLoading(true);
        const res = await tourService.getSelfTourById(selfTourId);
        setLoading(false);
        setSelfTourDetail(res.data);
      };
      fetchSelfTourDetail();
    }
  }, [selfTourId]);

  return (
    <ProfileLayout>
      <div className="rounded-lg px-10 py-4 w-full h-full bg-white shadow-md">
        {loading ? (
          <Loading />
        ) : (
          <>
            <Link
              href={"/profile/self-trip"}
              className="flex items-center gap-2"
            >
              <MdArrowBackIos />
              <span>Quay lại</span>
            </Link>
            <h1 className="text-[20px] font-semibold text-center mb-4">
              Lịch trình đã lưu
            </h1>
            <p className="mb-4 font-semibold">Bản đồ tham khảo</p>
            <div className="w-full h-[480px]">
              <MapTracking
                startLocation={selfTourDetail?.startLocation}
                endLocation={selfTourDetail?.endLocation}
                stopLocations={selfTourDetail?.stopLocations}
                distance={distance}
                setDistance={setDistance}
                showUserLocation={false}
              />
            </div>
            <p className="mt-4 font-semibold">Mô tả</p>
            <p
              dangerouslySetInnerHTML={{ __html: selfTourDetail?.description }}
            ></p>
          </>
        )}
      </div>
    </ProfileLayout>
  );
};

export default SelfTourDetail;
