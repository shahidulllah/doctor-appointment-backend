import mongoose, { Schema, Document, Types } from "mongoose";

export type AppointmentStatus =
  | "pending"
  | "accepted"
  | "cancelled"
  | "completed";

export interface IAppointment extends Document {
  doctorId: Types.ObjectId;
  patientId: Types.ObjectId;
  serviceId: Types.ObjectId;
  selectedDate: string;
  timeSlot: string;
  status: AppointmentStatus;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    doctorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    patientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    serviceId: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    selectedDate: { type: String, required: true }, // e.g., "2025-07-01"
    timeSlot: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "cancelled", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const AppointmentModel = mongoose.model<IAppointment>(
  "Appointment",
  AppointmentSchema
);
