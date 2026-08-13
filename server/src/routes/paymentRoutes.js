import express from "express";
import {
  createPaymentOrder,
  verifyPayment,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post(
  "/create-order/:token",
  createPaymentOrder
);

router.post(
  "/verify",
  verifyPayment
);

export default router;