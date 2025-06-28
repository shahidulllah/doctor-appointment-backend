import express from "express";
import {
  getAppointments,
  updateAppointmentStatus,
} from "../controllers/doctorAppointment.controller";
import { authenticate, requireDoctor } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", authenticate, requireDoctor, getAppointments);
router.patch(
  "/:id/status",
  authenticate,
  requireDoctor,
  updateAppointmentStatus
);

export default router;
