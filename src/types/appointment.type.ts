import { Document, Types } from "mongoose";

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
  review: {
    rating: number;
    comment: string;
  };
  doctorNote: string;
  createdAt: Date;
  updatedAt: Date;
}
