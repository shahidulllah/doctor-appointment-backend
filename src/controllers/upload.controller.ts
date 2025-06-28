import { Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import { UserModel } from "../models/User.model";

export const uploadProfileImage = async (req: Request, res: Response) => {
  try {
    const doctorId = (req as any).user.userId;

    if (!req.file) {
      res.status(400).json({ error: "No file provided" });
      return;
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    const doctor = await UserModel.findByIdAndUpdate(
      doctorId,
      { $set: { image: result.secure_url } },
      { new: true }
    );

    res.json({ message: "Image uploaded", doctor });
  } catch (error) {
    res.status(500).json({ error: "Upload failed" });
  }
};
