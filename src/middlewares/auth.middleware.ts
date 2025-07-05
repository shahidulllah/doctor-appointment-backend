import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Request to include user info
interface JwtPayload {
  userId: string;
  role: "doctor" | "patient" | "admin";
}

interface RequestWithUser extends Request {
  user?: JwtPayload;
}

// Authenticate JWT Token
export const authenticate = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized: No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
  return;
};

// Role guard: Doctor
export const requireDoctor = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "doctor") {
    res.status(403).json({ error: "Access denied: Doctors only" });
    return;
  }
  next();
};

// Role guard: Patient
export const requirePatient = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "patient") {
    res.status(403).json({ error: "Access denied: Patients only" });
    return;
  }
  next();
};

// Optional Role guard: Admin
export const requireAdmin = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "admin") {
    res.status(403).json({ error: "Access denied: Admins only" });
    return;
  }
  next();
};
