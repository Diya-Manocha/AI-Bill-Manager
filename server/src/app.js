import express from "express";
import cors from "cors";
import billRoutes from "./routes/billRoutes.js"

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Bill Maneger is running",
  });
});

app.use("/api/bills", billRoutes)

export default app;
