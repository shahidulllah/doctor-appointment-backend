import { Request, Response } from "express";
import { ServiceModel } from "../models/Service.model";

// Add Service
export const addService = async (req: Request, res: Response) => {
  try {
    const { title, description, price, duration } = req.body;
    const doctorId = (req as any).user.userId;

    const newService = await ServiceModel.create({
      doctorId,
      title,
      description,
      price,
      duration,
    });

    res.status(201).json({ message: "Service created", service: newService });
  } catch (error) {
    res.status(500).json({ error: "Failed to create service" });
  }
};

// Edit Service
export const updateService = async (req: Request, res: Response) => {
  try {
    const doctorId = (req as any).user.userId;
    const serviceId = req.params.id;
    const updates = req.body;

    const service = await ServiceModel.findOneAndUpdate(
      { _id: serviceId, doctorId },
      updates,
      { new: true }
    );

    if (!service) return res.status(404).json({ error: "Service not found" });

    res.json({ message: "Service updated", service });
  } catch (error) {
    res.status(500).json({ error: "Failed to update service" });
  }
};

// Delete Service
export const deleteService = async (req: Request, res: Response) => {
  try {
    const doctorId = (req as any).user.userId;
    const serviceId = req.params.id;

    const result = await ServiceModel.findOneAndDelete({
      _id: serviceId,
      doctorId,
    });

    if (!result) return res.status(404).json({ error: "Service not found" });

    res.json({ message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete service" });
  }
};
