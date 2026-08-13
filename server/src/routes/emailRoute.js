import express from "express";
import { sendBillEmail } from "../controllers/emailController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/:id/send-email", authMiddleware, sendBillEmail);

export default router;