import api from "./axiosInstance";

export const getBills = () => {
  return api.get("/bills");
};

export const getBillsById = (id) => {
  return api.post(`/bills/${id}`);
};

export const updateBill = (id, data) => {
  return api.patch(`/bills/${id}`, data);
};

export const deleteBill = (id) => {
  return api.delete(`/bills/${id}`);
};

export const uploadBill = (formData) => {
  return api.post("/bills/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
