import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/user.type";

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
