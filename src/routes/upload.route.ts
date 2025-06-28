import express from "express";
import { uploadProfileImage } from "../controllers/upload.controller";
import { authenticate, requireDoctor } from "../middlewares/auth.middleware";
import multer from "multer";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload-image", authenticate, requireDoctor, upload.single("image"), uploadProfileImage);
