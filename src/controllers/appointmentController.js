import { AppointmentService } from "../services/appointmentService.js";

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await AppointmentService.getAll();
    return res.status(200).json(appointments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await AppointmentService.getById(req.params.id);
    if (!appointment) {return res.status(404).json({ error: "Appointment not found" });}
    return res.status(200).json(appointment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createAppointment = async (req, res) => {
  try {
    const { patient_id, doctor_id, startTime, endTime } = req.body;
    const appointment = await AppointmentService.create(
      patient_id,
      doctor_id,
      startTime,
      endTime
    );
    return res.status(201).json(appointment);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateAppointment = async (_req, res) => {
  return res.status(501).json({ error: "Not implemented" });
};

export const deleteAppointment = async (req, res) => {
  try {
    await AppointmentService.cancel(req.params.id);
    return res.status(200).json({ message: "Appointment deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
