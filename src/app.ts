import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import serviceRoutes from "./routes/service.route";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/doctor/services", serviceRoutes);

app.get("/", (req, res) => {
  res.send("Doctor–Patient Appointment API is running");
});
