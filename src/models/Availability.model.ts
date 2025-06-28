import mongoose, { Schema, Document, Types } from "mongoose";

export interface IAvailability extends Document {
  doctorId: Types.ObjectId;
  serviceId: Types.ObjectId;
  day: string; 
  slots: string[]; 
}

const AvailabilitySchema = new Schema<IAvailability>(
  {
    doctorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    serviceId: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    day: { type: String, required: true },
    slots: [{ type: String }],
  },
  { timestamps: true }
);

export const AvailabilityModel = mongoose.model<IAvailability>(
  "Availability",
  AvailabilitySchema
);
