import axios from "./axios";

const getAllTours = async (page: number, limit: number) => {
  return await axios.get(`/tour?page=${page}&limit=${limit}`);
};

const getPopularTours = async () => {
  return await axios.get("/tour/popular-tours");
};

const likeTour = async (tourId: string) => {
  return await axios.post(`/tour/like-tour/${tourId}`);
};

export const tourService = {
  getPopularTours,
  getAllTours,
  likeTour,
};
