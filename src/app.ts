import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import serviceRoutes from "./routes/service.route";
import availabilityRoutes from "./routes/availability.routes";
import doctorAppointmentRoutes from "./routes/doctorAppointment.routes";

export const app = express();

app.use(cors());
app.use(express.json());

//Aplication routes
app.use("/auth", authRoutes);
app.use("/doctor/services", serviceRoutes);
app.use("/doctor/availability", availabilityRoutes);
app.use("/doctor/appointments", doctorAppointmentRoutes);

//Checking
app.get("/", (req, res) => {
  res.send("Doctor–Patient Appointment API is running");
});
