import patientService from "../services/patientService.js";

export const getAllPatients = async (req, res) => {
  try {
    const patients = await patientService.getAllPatients();
    return res.status(200).json(patients);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getPatientById = async (req, res) => {
  try {
    const patient = await patientService.getPatientById(req.params.id);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    return res.status(200).json(patient);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createPatient = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const patient = await patientService.createPatient({ name, email, phone });
    return res.status(201).json(patient);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const updated = await patientService.updatePatient(req.params.id, req.body);
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deletePatient = async (req, res) => {
  try {
    await patientService.deletePatient(req.params.id);
    return res.status(200).json({ message: "Patient deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
