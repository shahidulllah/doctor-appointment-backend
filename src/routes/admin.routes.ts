import express from "express";
import { getAdminStats } from "../controllers/admin.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();
router.get("/stats", authenticate, getAdminStats);
export default router;
