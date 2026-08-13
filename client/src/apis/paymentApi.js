import api from "./axiosInstance";

export const getPayment = () => {
  return api.get("/payment");
};
