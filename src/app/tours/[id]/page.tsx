"use client";

import ReviewCard from "@/components/card/ReviewCard";
import Loading from "@/components/global/Loading";
import BookingTourForm from "@/components/order/BookingTourForm";
import { tourService } from "@/services/api/tour";
import { reviewService } from "@/services/api/review";
import { formatCurrency } from "@/utils/common";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdOutlineCheck } from "react-icons/md";
import CreateReviewTour from "@/components/review/CreateReviewTour";

const TourDetail = ({ params }: { params: { id: string } }) => {
  const [tour, setTour] = useState<any>();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const createReview = (newReview: any) => {
    setReviews([newReview, ...reviews]);
  };

  const tourId = params.id;
  useEffect(() => {
    if (tourId) {
      const fetchTour = async () => {
        setLoading(true);
        const res = await tourService.getTourById(tourId);
        const reviewRes = await reviewService.getReviewsByTour(tourId);
        setLoading(false);
        setTour(res.data);
        setReviews(reviewRes.data);
      };
      fetchTour();
    }
  }, [tourId]);

  if (loading)
    return (
      <div className="w-full h-[calc(100vh-66px)]">
        <Loading />
      </div>
    );
  return (
    <div className="lg:px-32 py-10 px-6">
      <h1 className="text-3xl font-semibold text-primary">{tour?.name}</h1>
      <div className="p-4 border border-gray-300 rounded-md mb-8 mt-6 bg-base-200">
        <p className="py-1">
          Thời gian: {tour?.duration} ngày/ {tour?.duration - 1} đêm
        </p>
        <p className="py-1">
          Giá book tour:{" "}
          <span className="text-primary font-semibold">
            {formatCurrency(tour?.price)}
          </span>
        </p>
      </div>
      {tour && (
        <Image
          src={tour?.imageCover}
          alt="imgCover"
          width={1024}
          height={577}
          className="w-full h-[500px] object-cover rounded-lg"
        />
      )}
      <div className="mt-4">
        <h1 className="font-semibold text-lg">Tổng quan</h1>
        <p className="mt-2">{tour?.summary}</p>
      </div>
      <div className="mt-4">
        <h1 className="font-semibold text-lg">Lộ trình</h1>
        {tour?.itinerary.map((item: any) => (
          <div
            className="collapse bg-base-300 collapse-plus mt-2"
            key={item._id}
          >
            <input type="checkbox" />
            <div className="collapse-title text-base font-semibold">
              Ngày {item.day}: {item.route} ({item.distance} km)
            </div>
            <div className="collapse-content">
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h1 className="text-lg font-semibold">Bao gồm trong tiền thuê:</h1>
        <div className="flex items-center flex-wrap">
          <div className="basis-1/2 mt-4 flex items-center">
            <p className="mr-2">Hướng dẫn viên</p>
            <MdOutlineCheck size={24} color="#28a745" />
          </div>
          <div className="basis-1/2 mt-4 flex items-center">
            <p className="mr-2">Xe đầy xăng</p>
            <MdOutlineCheck size={24} color="#28a745" />
          </div>
          <div className="basis-1/2 mt-4 flex items-center">
            <p className="mr-2">Mũ bảo hiểm</p>
            <MdOutlineCheck size={24} color="#28a745" />
          </div>
          <div className="basis-1/2 mt-4 flex items-center">
            <p className="mr-2">Thức ăn + Đồ uống</p>
            <MdOutlineCheck size={24} color="#28a745" />
          </div>
          <div className="basis-1/2 mt-4 flex items-center">
            <p className="mr-2">Chỗ nghỉ ngơi</p>
            <MdOutlineCheck size={24} color="#28a745" />
          </div>
          <div className="basis-1/2 mt-4 flex items-center">
            <p className="mr-2">Phí vào cửa/ Giấy phép</p>
            <MdOutlineCheck size={24} color="#28a745" />
          </div>
          <div className="basis-1/2 mt-4 flex items-center">
            <p className="mr-2">Video chuyến đi</p>
            <MdOutlineCheck size={24} color="#28a745" />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h1 className="text-lg font-semibold">
          Đánh giá gần nhất từ khách hàng
        </h1>
        {reviews.length === 0 ? (
          <h1>Chưa có đánh giá!</h1>
        ) : (
          reviews
            .slice(0, 5)
            .map((review: any) => (
              <ReviewCard key={review._id} review={review} />
            ))
        )}
        <CreateReviewTour tourId={tourId} createReview={createReview} />
      </div>
      <div className="mt-6 flex-center">
        <div className="lg:w-[50%]">
          <h1 className="text-2xl font-semibold text-center">Book ngay!</h1>
          <BookingTourForm tour={tour} />
        </div>
      </div>
    </div>
  );
};

export default TourDetail;
