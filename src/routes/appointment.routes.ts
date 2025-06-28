import express from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
  bookAppointment,
  getPatientAppointments,
} from "../controllers/appointment.controller";

const router = express.Router();

router.post("/", authenticate, bookAppointment);
router.get("/", authenticate, getPatientAppointments);

export default router;
