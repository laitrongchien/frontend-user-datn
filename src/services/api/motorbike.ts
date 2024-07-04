import axios from "./axios";

const getAllMotorbikes = async (
  page: number,
  limit: number,
  userId?: string,
  type?: string,
  sortField?: string,
  sortOrder?: number
) => {
  let url = `/motorbike/all?page=${page}&limit=${limit}`;
  if (userId) {
    url += `&userId=${userId}`;
  }
  if (type) {
    url += `&type=${type}`;
  }
  if (sortField) {
    url += `&sort=${sortField}`;
  }
  if (sortOrder) {
    url += `&sortOrder=${sortOrder}`;
  }
  const res = await axios.get(url);
  return res;
};

const getPopularMotorbikes = async () => {
  return await axios.get("/motorbike/popular-motorbikes");
};

const getFavoriteMotorbikes = async () => {
  return await axios.get("/motorbike/favorite-motorbikes");
};

const getMotorbikeById = async (id: string) => {
  return await axios.get(`/motorbike/get-motorbike/${id}`);
};

const getSuggestMotorbikes = async (distance: number) => {
  return await axios.get(
    `/motorbike/get-suggest-motorbikes?distance=${distance}`
  );
};

const likeMotorbike = async (motorbikeId: string) => {
  return await axios.post(`/motorbike/like-motorbike/${motorbikeId}`);
};

const unlikeMotorbike = async (motorbikeId: string) => {
  return await axios.post(`/motorbike/unlike-motorbike/${motorbikeId}`);
};

const getAllAvailableMotor = async (motorbikeId: string, location: string) => {
  return await axios.get(
    `/identification/get-all-available-motor/${motorbikeId}?location=${location}&isTempoRent=false`
  );
};

export const motorbikeService = {
  getAllMotorbikes,
  likeMotorbike,
  unlikeMotorbike,
  getFavoriteMotorbikes,
  getMotorbikeById,
  getAllAvailableMotor,
  getSuggestMotorbikes,
  getPopularMotorbikes,
};
