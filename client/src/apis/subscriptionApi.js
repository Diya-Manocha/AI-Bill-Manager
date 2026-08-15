import api from "./axiosInstance";

export const getPlans = () => {
  return api.get("/subscription/get-plans");
};

export const createSubscriptionOrder = (planId) => {
  return api.post("/subscription/create-order", {
    planId,
  });
};

export const verifySubscriptionPayment = (paymentData) => {
  return api.post("/subscription/verify-payment", 
    paymentData,
  );
};