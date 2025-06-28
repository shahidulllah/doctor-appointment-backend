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
