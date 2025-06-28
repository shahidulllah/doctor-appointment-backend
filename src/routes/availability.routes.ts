import express from "express";
import {
  setAvailability,
  getDoctorAvailability,
  deleteAvailability,
} from "../controllers/availability.controller";
import { authenticate, requireDoctor } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", authenticate, requireDoctor, setAvailability);
router.get("/", authenticate, requireDoctor, getDoctorAvailability);
router.delete("/:id", authenticate, requireDoctor, deleteAvailability);

export default router;
