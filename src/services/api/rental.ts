import axios from "./axios";

const createRentalMotorbike = async (rentalData: any) => {
  return await axios.post("rental/create-rental", rentalData);
};

const getMotorbikeRentalsByUser = async () => {
  return await axios.get("rental/get-rentals-by-user");
};

const getMotorbikeRentalDetail = async (rentalId: string) => {
  return await axios.get(`rental/get-rental-detail/${rentalId}`);
};

export const rentalService = {
  createRentalMotorbike,
  getMotorbikeRentalsByUser,
  getMotorbikeRentalDetail,
};
