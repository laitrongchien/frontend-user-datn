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

const cancelBookingTour = async (bookingId: string) => {
  return await axios.put(`/booking/cancel-booking-tour/${bookingId}`);
};

export const bookingTourService = {
  createBookingTour,
  getBookingTourByUser,
  getBookingTourById,
  cancelBookingTour,
};
