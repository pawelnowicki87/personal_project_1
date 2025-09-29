import { PatientModel } from "../models/patientModel.js";

export const patientService = {
  async createPatient(data) {
    return await PatientModel.create(data);
  },

  async getAllPatients() {
    return await PatientModel.findAll();
  },

  async getPatientById(id) {
    return await PatientModel.findById(id);
  },

  async updatePatient(id, data) {
    return await PatientModel.update(id, data);
  },

  async deletePatient(id) {
    return await PatientModel.delete(id);
  },
};

export default patientService;
