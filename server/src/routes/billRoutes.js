import upload from "../middlewares/uploadMiddleware.js";
import express from "express"
import {uploadBill} from "../controllers/billController.js"

const router = express.Router();

router.post("/upload", upload.single("bill"), uploadBill)

export default router