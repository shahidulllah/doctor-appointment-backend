import express from "express";
import {
  registerDoctor,
  registerPatient,
  login,
  getCurrentUser,
} from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/register-doctor", registerDoctor);
router.post("/register-patient", registerPatient);
router.post("/login", login);
router.get("/me", authenticate, getCurrentUser);

export default router;
