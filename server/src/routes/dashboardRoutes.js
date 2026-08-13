import express, { Router } from "express"
import { getDashboard } from "../controllers/DashboardController.js"
import authMiddleware from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get("/", authMiddleware, getDashboard)

export default router;