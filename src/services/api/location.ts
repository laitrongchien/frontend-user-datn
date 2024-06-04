import axios from "./axios";

const getAllLocations = async () => {
  let url = "/location/all";
  const res = await axios.get(url);
  return res;
};

export const locationService = {
  getAllLocations,
};
