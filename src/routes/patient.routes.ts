import express from "express";
import {
  getAllDoctors,
  getDoctorDetails,
} from "../controllers/patient.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/doctors", authenticate, getAllDoctors);
router.get("/doctors/:id", authenticate, getDoctorDetails);

export default router;
