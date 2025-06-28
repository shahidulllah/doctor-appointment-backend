import { Request, Response } from "express";
import { UserModel } from "../models/User.model";
import { AppointmentModel } from "../models/Appointment.model";

export const getAdminStats = async (_req: Request, res: Response) => {
  try {
    const totalDoctors = await UserModel.countDocuments({ role: "doctor" });
    const totalPatients = await UserModel.countDocuments({ role: "patient" });
    const totalAppointments = await AppointmentModel.countDocuments();

    res.json({
      totalDoctors,
      totalPatients,
      totalAppointments,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};
