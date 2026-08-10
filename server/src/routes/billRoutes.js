import upload from "../middlewares/uploadMiddleware.js";
import express from "express";
import { uploadBill, getBills, getBillById, deleteBill, updateBill } from "../controllers/billController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware)

router.get("/", getBills);
router.get("/:id", getBillById);    
router.delete("/:id", deleteBill);
router.patch("/:id", updateBill);
router.post("/upload", upload.single("bill"), uploadBill);

export default router;