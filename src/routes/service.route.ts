import express from "express";
import {
  addService,
  updateService,
  deleteService,
} from "../controllers/service.controller";
import { authenticate, requireDoctor } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", authenticate, requireDoctor, addService);
router.patch("/:id", authenticate, requireDoctor, updateService);
router.delete("/:id", authenticate, requireDoctor, deleteService);

export default router;
