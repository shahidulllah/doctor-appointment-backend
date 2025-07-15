import { Document, Types } from "mongoose";

export interface IAvailability extends Document {
  doctorId: Types.ObjectId;
  serviceId: Types.ObjectId;
  day: string;
  slots: string[];
}
