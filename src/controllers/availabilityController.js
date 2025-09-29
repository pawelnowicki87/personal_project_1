import availabilityService from "../services/availabilityService.js";

export const getDoctorAvailability = async (req, res) => {
  try {
    const availability = await availabilityService.getDoctorAvailability(req.params.doctorId);
    return res.status(200).json(availability);
  } catch (error) {
    console.error("[GET AVAILABILITY ERROR]:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const setDoctorAvailability = async (req, res) => {
  try {
    const availability = await availabilityService.setDoctorAvailability(req.params.doctorId, req.body);
    return res.status(201).json(availability);
  } catch (error) {
    console.error("[SET AVAILABILITY ERROR]:", error);
    return res.status(400).json({ error: error.message });
  }
};

export const updateDoctorAvailability = async (req, res) => {
  try {
    const availability = await availabilityService.updateDoctorAvailability(req.params.doctorId, req.body);
    return res.status(200).json(availability);
  } catch (error) {
    console.error("[UPDATE AVAILABILITY ERROR]:", error);
    return res.status(400).json({ error: error.message });
  }
};

export const deleteDoctorAvailability = async (req, res) => {
  try {
    await availabilityService.deleteDoctorAvailability(req.params.doctorId);

    return res.status(200).json({ message: "Availability deleted" });
  } catch (error) {
    console.error("[DELETE AVAILABILITY ERROR]:", error);
    return res.status(500).json({ error: error.message });
  }
};
