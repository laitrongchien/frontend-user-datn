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

const getReviewsByTour = async (tourId: string) => {
  return await axios.get(`review/get-reviews-by-tour/${tourId}`);
};

const getReviewsByMotorbike = async (motorbikeId: string) => {
  return await axios.get(`review/get-reviews-by-motorbike/${motorbikeId}`);
};

export const reviewService = {
  createReviewTour,
  getReviewsByTour,
  createReviewMotorbike,
  getReviewsByMotorbike,
};
