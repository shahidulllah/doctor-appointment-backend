import { Request, Response } from "express";
import { AppointmentModel } from "../models/Appointment.model";
import { AvailabilityModel } from "../models/Availability.model";
import { sendMockEmail } from "../utils/email.util";

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

    sendMockEmail(
      "admin@gmail.com",
      "New Appointment Request",
      `Doctor ID: ${doctorId}, Patient ID: ${patientId}`
    );
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

//Review adding
export const addReview = async (req: Request, res: Response) => {
  try {
    const patientId = (req as any).user.userId;
    const { id } = req.params; // appointment ID
    const { rating, comment } = req.body;

    const appointment = await AppointmentModel.findOne({
      _id: id,
      patientId,
      status: "completed",
    });

    if (!appointment) {
      return res
        .status(404)
        .json({ error: "Completed appointment not found or not yours" });
    }

    if (appointment.review?.rating) {
      return res.status(400).json({ error: "Review already submitted" });
    }

    appointment.review = { rating, comment };
    await appointment.save();

    res.json({ message: "Review submitted", appointment });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit review" });
  }
};
