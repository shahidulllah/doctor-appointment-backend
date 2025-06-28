import { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "doctor" | "patient";
  specialization?: string;
  hospitalName?: string;
  hospitalFloor?: string;
  age?: number;
  gender?: string;
}