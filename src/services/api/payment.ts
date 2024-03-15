import axios from "./axios";

const createPaymentUrl = async (amount: number) => {
  return await axios.post("/payment/create-payment-url", { amount: amount });
};

export const paymentService = { createPaymentUrl };
