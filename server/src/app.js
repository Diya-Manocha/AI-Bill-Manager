import express from "express";
import cors from "cors";
import billRoutes from "./routes/billRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Bill Manager is running",
  });
});

app.use("/api/bills", billRoutes);
app.use("/api/auth", authRoutes);

export default app;