import axios from "./axios";

const createReviewTour = async (reviewTourData: any) => {
  return await axios.post("review/create-review-tour", reviewTourData);
};

const createReviewMotorbike = async (reviewMotorbikeData: any) => {
  return await axios.post(
    "review/create-review-motorbike",
    reviewMotorbikeData
  );
};

const getReviewsByTour = async (
  tourId: string,
  page: number,
  limit: number
) => {
  return await axios.get(
    `review/get-reviews-by-tour/${tourId}?page=${page}&limit=${limit}`
  );
};

const getReviewsByMotorbike = async (
  motorbikeId: string,
  page: number,
  limit: number
) => {
  return await axios.get(
    `review/get-reviews-by-motorbike/${motorbikeId}?page=${page}&limit=${limit}`
  );
};

export const reviewService = {
  createReviewTour,
  getReviewsByTour,
  createReviewMotorbike,
  getReviewsByMotorbike,
};
