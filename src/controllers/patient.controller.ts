import { Request, Response } from "express";
import { UserModel } from "../models/User.model";
import { ServiceModel } from "../models/Service.model";
import { AvailabilityModel } from "../models/Availability.model";

// Get all doctors (filter by hospital, specialization, service)
export const getAllDoctors = async (req: Request, res: Response) => {
  try {
    const { hospital, specialization, service } = req.query;

    const filter: any = { role: "doctor" };

    if (hospital) filter.hospitalName = hospital;
    if (specialization) filter.specialization = specialization;

    let doctors = await UserModel.find(filter).select("-password");

    // If service filter applied
    if (service) {
      const serviceDocs = await ServiceModel.find({
        title: { $regex: service, $options: "i" },
      });
      const serviceDoctorIds = serviceDocs.map((s) => s.doctorId.toString());
      doctors = doctors.filter((d) =>
        serviceDoctorIds.includes(d._id.toString())
      );
    }

    res.json({ doctors });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
};

// Get doctor by ID with services + availability
export const getDoctorDetails = async (req: Request, res: Response) => {
  try {
    const doctorId = req.params.id;

    const doctor = await UserModel.findById(doctorId).select("-password");
    const services = await ServiceModel.find({ doctorId });
    const availability = await AvailabilityModel.find({ doctorId });

    res.json({ doctor, services, availability });
  } catch (error) {
    res.status(500).json({ error: "Failed to get doctor profile" });
  }
};
