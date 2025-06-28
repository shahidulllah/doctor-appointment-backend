import { Request, Response } from "express";
import { AvailabilityModel } from "../models/Availability.model";

// Add or update availability
export const setAvailability = async (req: Request, res: Response) => {
  try {
    const doctorId = (req as any).user.userId;
    const { serviceId, day, slots } = req.body;

    const existing = await AvailabilityModel.findOne({
      doctorId,
      serviceId,
      day,
    });

    if (existing) {
      existing.slots = slots;
      await existing.save();
      res.json({
        message: "Availability updated",
        availability: existing,
      });
      return;
    }

    const newAvailability = await AvailabilityModel.create({
      doctorId,
      serviceId,
      day,
      slots,
    });

    res
      .status(201)
      .json({ message: "Availability set", availability: newAvailability });
  } catch (error) {
    res.status(500).json({ error: "Failed to set availability" });
  }
};

// View all availability for logged-in doctor
export const getDoctorAvailability = async (req: Request, res: Response) => {
  try {
    const doctorId = (req as any).user.userId;
    const availability = await AvailabilityModel.find({ doctorId }).populate(
      "serviceId"
    );
    res.json({ availability });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch availability" });
  }
};

// Delete specific availability entry
export const deleteAvailability = async (req: Request, res: Response) => {
  try {
    const doctorId = (req as any).user.userId;
    const id = req.params.id;

    const result = await AvailabilityModel.findOneAndDelete({
      _id: id,
      doctorId,
    });
    if (!result) {
      res.status(404).json({ error: "Not found" });
      return;
    }

    res.json({ message: "Availability deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete availability" });
  }
};
