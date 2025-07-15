import express from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
  bookAppointment,
  getPatientAppointments,
} from "../controllers/appointment.controller";
import {
  addReview,
  addDoctorNote,
} from "../controllers/appointment.controller";
import { requireDoctor, requirePatient } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", authenticate, bookAppointment);
router.get("/", authenticate, getPatientAppointments);
router.post("/:id/review", authenticate, requirePatient, addReview);
router.post("/:id/note", authenticate, requireDoctor, addDoctorNote);

export default router;
