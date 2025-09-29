import { AppointmentModel } from "../models/appointmentModel.js";

export const AppointmentService = {
  async create(patientId, doctorId, startTime, endTime) {
    const conflicts = await AppointmentModel.findByDoctorAndTime(
      doctorId,
      startTime,
      endTime
    );

    if (conflicts.length > 0) {
      throw new Error("Doctor is not available at this time");
    }

    return await AppointmentModel.createAppointment(
      patientId,
      doctorId,
      startTime,
      endTime
    );
  },

  async getAll() {
    return await AppointmentModel.findAll();
  },

  async getById(id) {
    return await AppointmentModel.findById(id);
  },

  async cancel(id) {
    await AppointmentModel.deleteAppointment(id);
  },
};
