import { Request, Response } from "express";
import { AppointmentModel } from "../models/Appointment.model";
import { AvailabilityModel } from "../models/Availability.model";

export const bookAppointment = async (req: Request, res: Response) => {
  try {
    const patientId = (req as any).user.userId;
    const { doctorId, serviceId, selectedDate, timeSlot } = req.body;

    // Check availability for selected day & time
    const availability = await AvailabilityModel.findOne({
      doctorId,
      serviceId,
      day: new Date(selectedDate).toLocaleDateString("en-US", {
        weekday: "long",
      }),
    });

    if (!availability || !availability.slots.includes(timeSlot)) {
      res.status(400).json({ error: "Selected slot is not available" });
      return;
    }

    // Prevent double booking
    const alreadyBooked = await AppointmentModel.findOne({
      doctorId,
      serviceId,
      selectedDate,
      timeSlot,
      status: { $in: ["pending", "accepted"] },
    });

    if (alreadyBooked) {
      res.status(400).json({ error: "This slot is already booked" });
      return;
    }

    const appointment = await AppointmentModel.create({
      doctorId,
      patientId,
      serviceId,
      selectedDate,
      timeSlot,
      status: "pending",
    });

    res.status(201).json({ message: "Appointment requested", appointment });
  } catch (error) {
    res.status(500).json({ error: "Failed to book appointment" });
  }
};

//Get patient appointment
export const getPatientAppointments = async (req: Request, res: Response) => {
  try {
    const patientId = (req as any).user.userId;

    const appointments = await AppointmentModel.find({ patientId })
      .populate("doctorId", "name email hospitalName")
      .populate("serviceId", "title");

    res.json({ appointments });
  } catch (error) {
    res.status(500).json({ error: "Failed to get appointments" });
  }
};
