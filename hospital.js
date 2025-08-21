import { findSpecializationBySymptom, specializations } from "./specializations.js";
import { findNearestAppointment } from "./scheduler.js";

function resolveSpecialization(input) {
  const lower = input.toLowerCase().trim();

  const specNames = new Set(specializations.map(s => s.name));
  if (specNames.has(lower)) return lower;

  return findSpecializationBySymptom(lower);
}

const input = "suspected fracture";

const specialization = resolveSpecialization(input);

if (!specialization) {
  console.log("No specialization found for this input.");
} else {
  console.log(`You have choosen a ${specialization} doctor.`);

  const appointment = findNearestAppointment(specialization);

  if (appointment) {
    console.log(
      `Nearest available: ${appointment.specialization} with ${appointment.doctor} on ${appointment.day} at ${appointment.start}-${appointment.end}`
    );
  } else {
    console.log("No available appointments found.");
  }
}
