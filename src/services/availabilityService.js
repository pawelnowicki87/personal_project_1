import { AvailabilityModel } from "../models/availabilityModel.js";

export const availabilityService = {
  async createAvailability(data) {
    return await AvailabilityModel.create(data);
  },

  async getAllAvailabilities() {
    return await AvailabilityModel.findAll();
  },

  async getAvailabilityById(id) {
    return await AvailabilityModel.findById(id);
  },

  async getDoctorAvailability(doctorId) {
    const all = await AvailabilityModel.findAll();
    return all.filter((av) => av.doctor_id === Number(doctorId));
  },

  async setDoctorAvailability(doctorId, data) {
    return await AvailabilityModel.setForDoctor(doctorId, data);
  },

  async updateDoctorAvailability(doctorId, data) {
    return await AvailabilityModel.updateForDoctor(doctorId, data);
  },

  async deleteDoctorAvailability(doctorId) {
    return await AvailabilityModel.deleteForDoctor(doctorId);
  },
};

export default availabilityService;
