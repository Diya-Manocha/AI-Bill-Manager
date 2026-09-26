import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import billRoutes from "./routes/billRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import emailRoutes from "./routes/emailRoute.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";

const app = express();
const serverDirectory = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());
// Invoice uploads are stored as relative paths in the Bill document.
// Expose only that directory so the dashboard can preview saved bills.
app.use("/uploads", express.static(path.join(serverDirectory, "../uploads")));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Bill Manager is running",
  });
});

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", emailRoutes);
app.use("/api/subscription", subscriptionRoutes);

export default app;
