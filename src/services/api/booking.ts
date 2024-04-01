import axios from "./axios";

const createBookingTour = async (bookingTourData: any) => {
  return await axios.post("booking/create-booking-tour", bookingTourData);
};

const getBookingTourById = async (id: string) => {
  return await axios.get(`/booking/get-booking-tour/${id}`);
};

const getBookingTourByUser = async () => {
  return await axios.get("booking/get-user-booking-tour");
};

export const bookingTourService = {
  createBookingTour,
  getBookingTourByUser,
  getBookingTourById,
};
