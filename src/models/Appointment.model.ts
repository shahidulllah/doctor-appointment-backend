import mongoose, { Schema } from "mongoose";
import { IAppointment } from "../types/appointment.type";

const AppointmentSchema = new Schema<IAppointment>(
  {
    doctorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    patientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    serviceId: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    selectedDate: { type: String, required: true },
    timeSlot: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "cancelled", "completed"],
      default: "pending",
    },
    review: {
      rating: { type: Number, min: 1, max: 5 },
      comment: { type: String },
    },
    doctorNote: { type: String },
  },
  { timestamps: true }
);

export const AppointmentModel = mongoose.model<IAppointment>(
  "Appointment",
  AppointmentSchema
);
