import mongoose, { Schema, Document } from "mongoose";

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

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["doctor", "patient"], required: true },

    // Doctor-specific
    specialization: String,
    hospitalName: String,
    hospitalFloor: String,

    // Patient-specific
    age: Number,
    gender: String,
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>("User", UserSchema);
