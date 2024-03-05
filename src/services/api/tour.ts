import axios from "./axios";

const getPopularTours = async () => {
  return await axios.get("/tour/popular-tours");
};

export const tourService = { getPopularTours };
