import { Document, Types } from "mongoose";

export interface IService extends Document {
  doctorId: Types.ObjectId;
  title: string;
  description: string;
  price: number;
  duration: number;
}