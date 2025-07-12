import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User.model";

const JWT_SECRET = process.env.JWT_SECRET as string;

const generateToken = (userId: string, role: string) => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: "7d" });
};

export const registerDoctor = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      specialization,
      hospitalName,
      hospitalFloor,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const doctor = new UserModel({
      name,
      email,
      phone,
      password: hashedPassword,
      specialization,
      hospitalName,
      hospitalFloor,
      role: "doctor",
    });

    await doctor.save();
    res.status(201).json({ message: "Doctor registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to register doctor" });
  }
};

export const registerPatient = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password, age, gender } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const patient = new UserModel({
      name,
      email,
      phone,
      password: hashedPassword,
      age,
      gender,
      role: "patient",
    });

    await patient.save();
    res.status(201).json({ message: "Patient registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to register patient" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = generateToken(user._id, user.role);
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ role: user.role, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};
