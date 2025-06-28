import mongoose, { Schema, Document, Types } from "mongoose";

export interface IService extends Document {
  doctorId: Types.ObjectId;
  title: string;
  description: string;
  price: number;
  duration: number;
}

const ServiceSchema = new Schema<IService>(
  {
    doctorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
  },
  { timestamps: true }
);

export const ServiceModel = mongoose.model<IService>("Service", ServiceSchema);
