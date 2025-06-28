import { Request, Response } from "express";
import { AppointmentModel } from "../models/Appointment.model";

// Get all appointments (filter by status)
export const getAppointments = async (req: Request, res: Response) => {
  try {
    const doctorId = (req as any).user.userId;
    const status = req.query.status;

    const query: any = { doctorId };
    if (status) query.status = status;

    const appointments = await AppointmentModel.find(query)
      .populate("patientId", "name email")
      .populate("serviceId", "title");

    res.json({ appointments });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};

// Update appointment status (accept, cancel, complete)
export const updateAppointmentStatus = async (req: Request, res: Response) => {
  try {
    const doctorId = (req as any).user.userId;
    const { id } = req.params;
    const { status } = req.body;

    if (!["accepted", "cancelled", "completed"].includes(status)) {
      res.status(400).json({ error: "Invalid status" });
      return;
    }

    const appointment = await AppointmentModel.findOneAndUpdate(
      { _id: id, doctorId },
      { status },
      { new: true }
    );

    if (!appointment) {
      res.status(404).json({ error: "Appointment not found" });
      return;
    }
    res.json({ message: "Appointment updated", appointment });
  } catch (error) {
    res.status(500).json({ error: "Failed to update appointment status" });
  }
};
