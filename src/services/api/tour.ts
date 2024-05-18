import axios from "./axios";

const getAllTours = async (
  page: number,
  limit: number,
  userId?: string,
  startLocation?: string,
  minDuration?: number,
  maxDuration?: number
) => {
  let url = `/tour/all?page=${page}&limit=${limit}`;
  if (userId) {
    url += `&userId=${userId}`;
  }
  if (startLocation) {
    url += `&startLocation=${startLocation}`;
  }
  if (minDuration) {
    url += `&minDuration=${minDuration}`;
  }
  if (maxDuration) {
    url += `&maxDuration=${maxDuration}`;
  }
  const res = await axios.get(url);
  return res;
};

const getTourById = async (id: string) => {
  return await axios.get(`/tour/get-tour/${id}`);
};

const getPopularTours = async () => {
  return await axios.get("/tour/popular-tours");
};

const getFavoriteTours = async () => {
  return await axios.get("/tour/favorite-tours");
};

const likeTour = async (tourId: string) => {
  return await axios.post(`/tour/like-tour/${tourId}`);
};

const unlikeTour = async (tourId: string) => {
  return await axios.post(`/tour/unlike-tour/${tourId}`);
};

export const tourService = {
  getPopularTours,
  getAllTours,
  getFavoriteTours,
  likeTour,
  unlikeTour,
  getTourById,
};
