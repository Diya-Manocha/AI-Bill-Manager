import express from "express";

import { createSubscriptionOrder, getPlans, verifySubscriptionPayment } from "../controllers/subscriptionController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/get-plans", authMiddleware, getPlans)
router.post("/create-order", authMiddleware, createSubscriptionOrder);
router.post("/verify-payment", authMiddleware, verifySubscriptionPayment)

export default router;
