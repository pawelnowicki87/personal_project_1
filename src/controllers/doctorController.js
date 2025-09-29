import doctorService from "../services/doctorService.js";

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorService.getAllDoctors();
    return res.status(200).json(doctors);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getDoctorById = async (req, res) => {
  try {
    const doctor = await doctorService.getDoctorById(req.params.id);
    if (!doctor) {return res.status(404).json({ error: "Doctor not found" });}
    return res.status(200).json(doctor);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createDoctor = async (req, res) => {
  try {
    const { name, email, phone, specialization_id } = req.body;
    if (!name || !email || !specialization_id) {
      throw new Error("Name, email and specialization_id are required");
    }
    const doctor = await doctorService.createDoctor({ name, email, phone, specialization_id });
    return res.status(201).json(doctor);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateDoctor = async (req, res) => {
  try {
    const updated = await doctorService.updateDoctor(req.params.id, req.body);
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    await doctorService.deleteDoctor(req.params.id);
    return res.status(200).json({ message: "Doctor deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
