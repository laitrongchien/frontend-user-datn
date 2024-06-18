"use client";

import ReviewCard from "@/components/card/ReviewCard";
import Image from "next/image";
import { MdOutlineCheck } from "react-icons/md";
import { useEffect, useState } from "react";
import { motorbikeService } from "@/services/api/motorbike";
import Loading from "@/components/global/Loading";
import { reviewService } from "@/services/api/review";
import RentMotorbikeForm from "@/components/motorbike/RentMotorbikeForm";
import CreateReviewMotorbike from "@/components/motorbike/CreateReviewMotorbike";
import { REVIEWS_PER_MOTOR } from "@/constants";
import Pagination from "@/components/global/Pagination";

const MotorbikeDetail = ({ params }: { params: { id: string } }) => {
  const [motorbike, setMotorbike] = useState<any>();
  const [reviews, setReviews] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const reviewsPerMotor = REVIEWS_PER_MOTOR;
  const [loadingMotor, setLoadingMotor] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(false);

  const createReview = (newReview: any) => {
    setReviews([newReview, ...reviews]);
  };

  const motorbikeId = params.id;

  useEffect(() => {
    if (motorbikeId) {
      const fetchMotorbike = async () => {
        setLoadingMotor(true);
        const res = await motorbikeService.getMotorbikeById(motorbikeId);
        setLoadingMotor(false);
        setMotorbike(res.data);
      };
      fetchMotorbike();
    }
  }, [motorbikeId]);

  useEffect(() => {
    if (motorbikeId) {
      const fetchReviews = async () => {
        setLoadingReviews(true);
        const reviewRes = await reviewService.getReviewsByMotorbike(
          motorbikeId,
          currentPage,
          reviewsPerMotor
        );
        setLoadingReviews(false);
        const { motorReviews, totalPages } = reviewRes.data;
        setReviews(motorReviews);
        setTotalPages(totalPages);
      };
      fetchReviews();
    }
  }, [currentPage, motorbikeId, reviewsPerMotor]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loadingMotor)
    return (
      <div className="w-full h-[calc(100vh-66px)]">
        <Loading />
      </div>
    );

  return (
    <div>
      <div className="flex relative px-10 py-[30px]">
        <div className="basis-[64%] px-10">
          {motorbike && (
            <Image
              src={motorbike.image}
              alt="img1"
              width={1024}
              height={759}
              className="w-[80%] object-cover rounded-lg"
            />
          )}
          <h1 className="font-sans text-4xl font-semibold mt-4">
            {motorbike?.name}
          </h1>
          <div className="mt-2">
            <h1 className="text-lg font-semibold">Tổng quan</h1>
            <p className="mt-2">{motorbike?.description}</p>
            <h1 className="text-lg font-semibold mt-4">Thông số</h1>
            <p className="py-2">Phân khối: {motorbike?.engine} cc</p>
            <p className="py-2">Khối lượng: {motorbike?.weight} kg</p>
            <p className="py-2">Chiều cao yên: {motorbike?.height} mm</p>
            <p className="py-2">
              Dung tích bình xăng: {motorbike?.fuelCapacity} l
            </p>
          </div>
          <div className="mt-4">
            <h1 className="text-lg font-semibold">Bao gồm trong tiền thuê:</h1>
            <div className="flex items-center flex-wrap">
              <div className="basis-1/2 mt-4 flex items-center">
                <Image
                  src="https://cdn.riderly.com/storage/media/img/addons/helmet.svg"
                  alt="img-source"
                  width={150}
                  height={150}
                  className="w-8 h-8 object-cover"
                />
                <p className="ml-4 mr-2">Mũ bảo hiểm</p>
                <MdOutlineCheck size={24} color="#28a745" />
              </div>
              <div className="basis-1/2 mt-4 flex items-center">
                <Image
                  src="https://cdn.riderly.com/storage/media/img/addons/padlock.svg"
                  alt="img-source"
                  width={150}
                  height={150}
                  className="w-8 h-8 object-cover"
                />
                <p className="ml-4 mr-2">Khóa xe</p>
                <MdOutlineCheck size={24} color="#28a745" />
              </div>
              <div className="basis-1/2 mt-4 flex items-center">
                <Image
                  src="https://cdn.riderly.com/storage/media/img/addons/mechanic.svg"
                  alt="img-source"
                  width={150}
                  height={150}
                  className="w-8 h-8 object-cover"
                />
                <p className="ml-4 mr-2">Hỗ trợ sửa chữa</p>
                <MdOutlineCheck size={24} color="#28a745" />
              </div>
              <div className="basis-1/2 mt-4 flex items-center">
                <Image
                  src="https://cdn.riderly.com/storage/media/img/addons/bike_replacement.svg"
                  alt="img-source"
                  width={150}
                  height={150}
                  className="w-8 h-8 object-cover"
                />
                <p className="ml-4 mr-2">Thay thế xe</p>
                <MdOutlineCheck size={24} color="#28a745" />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h1 className="text-lg font-semibold">Đánh giá từ khách hàng</h1>
            {loadingReviews ? (
              <div className="w-full h-[400px]">
                <Loading />
              </div>
            ) : reviews?.length === 0 ? (
              <h1>Chưa có đánh giá!</h1>
            ) : (
              reviews.map((review: any) => (
                <ReviewCard key={review._id} review={review} />
              ))
            )}
            {reviews?.length !== 0 && (
              <div className="flex-center mt-6 mb-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
            <CreateReviewMotorbike
              motorbikeId={motorbikeId}
              createReview={createReview}
            />
          </div>
        </div>

        <div className="basis-[36%] relative">
          <div className="w-full top-[90px] right-0 sticky">
            <RentMotorbikeForm
              motorbikeId={motorbikeId}
              motorbikePrice={motorbike?.price}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotorbikeDetail;
