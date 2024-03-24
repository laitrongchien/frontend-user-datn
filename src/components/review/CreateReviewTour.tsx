"use client";

import { useState } from "react";
import Modal from "../global/Modal";
import { reviewService } from "@/services/api/review";
import { useAppSelector } from "@/store/hooks";

const CreateReviewTour = ({
  tourId,
  createReview,
}: {
  tourId: string;
  createReview: any;
}) => {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const { user } = useAppSelector((state) => state.auth);

  const handleRating = async () => {
    setRating(5);
    setContent("");
    const reviewTourData = { user: user._id, tour: tourId, rating, content };
    const res = await reviewService.createReviewTour(reviewTourData);
    createReview(res.data);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <input
          key={i}
          type="radio"
          name={`rating-1`}
          className="mask mask-star bg-orange-400"
          checked={i === rating}
          onChange={() => setRating(i)}
        />
      );
    }
    return stars;
  };

  return (
    <div className="mt-6">
      {user && (
        <button
          onClick={() => {
            (
              document.getElementById("my_modal_2") as HTMLDialogElement
            )?.showModal();
          }}
          className="p-2 border border-gray-200 rounded-lg bg-primary text-white"
        >
          Viết đánh giá của bạn
        </button>
      )}
      <Modal>
        <h3 className="font-semibold">Viết đánh giá của bạn</h3>
        <div className="rating rating-md mt-2">{renderStars()}</div>
        <div>
          <h1>Nội dung</h1>
          <textarea
            className="w-full mt-2 mb-4 px-2 py-1 border border-gray-400 rounded-lg"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <form method="dialog">
            <button
              className="mr-4 p-2 border border-gray-200 rounded-lg bg-primary text-white"
              onClick={handleRating}
            >
              Xác nhận
            </button>
            <button className="py-2 px-4 border border-gray-200 rounded-lg bg-slate-100">
              Hủy
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default CreateReviewTour;
