import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import serviceRoutes from "./routes/service.route";
import availabilityRoutes from "./routes/availability.routes";
import appointmentRoutes from "./routes/appointment.routes";
import doctorAppointmentRoutes from "./routes/doctorAppointment.routes";
import patientRoutes from "./routes/patient.routes";
import adminRoutes from "./routes/admin.routes";

export const app = express();

app.use(cors());
app.use(express.json());

//Aplication routes
app.use("/auth", authRoutes);
app.use("/doctor/services", serviceRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/doctor/availability", availabilityRoutes);
app.use("/doctor/appointments", doctorAppointmentRoutes);
app.use("/patient", patientRoutes);
app.use("/admin", adminRoutes);

//Checking
app.get("/", (req, res) => {
  res.send("Doctor–Patient Appointment API is running");
});
