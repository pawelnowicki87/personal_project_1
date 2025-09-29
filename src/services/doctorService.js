import { DoctorModel } from "../models/doctorModel.js";

export const doctorService = {
  async getAllDoctors() {
    return await DoctorModel.findAll();
  },

  async getDoctorById(id) {
    const doctor = await DoctorModel.findById(id);
    if (!doctor) {throw new Error("Doctor not found");}
    return doctor;
  },

  async createDoctor({ name, email, phone, specialization_id }) {
    return await DoctorModel.create({ name, email, phone, specialization_id });
  },

  async updateDoctor(id, data) {
    const updated = await DoctorModel.update(id, data);
    if (!updated) {throw new Error("Doctor not found");}
    return updated;
  },

  async deleteDoctor(id) {
    await DoctorModel.delete(id);
  },
};

export default doctorService;
