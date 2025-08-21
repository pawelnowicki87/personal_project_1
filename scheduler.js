import { doctors } from "./doctors.js";
import { appointments } from "./appointments.js";
import { timeToMin, generateSlots } from "./time.js";

export function findNearestAppointment(specialization) {
  const filteredDoctors = doctors.filter(d => d.specialization === specialization);
  if (filteredDoctors.length === 0) return null;

  const doctorsWithLoad = filteredDoctors.map(doc => ({
    ...doc,
    load: appointments.filter(a => a.doctorId === doc.id).length
  }));
  doctorsWithLoad.sort((a, b) => a.load - b.load);

  console.log("Patient load per doctor:");
  doctorsWithLoad.forEach(d =>
    console.log(`- ${d.name} (${d.specialization}): ${d.load} visits`)
  );

  const doctor = doctorsWithLoad[0];
  console.log(`Selected doctor: ${doctor.name}\n`);

  for (const window of doctor.workWindows) {
    const slots = generateSlots(window.from, window.to, doctor.slotSizeMin);

    for (const slot of slots) {
      const breakInDay = doctor.breaks.find(b => b.day === window.day);
      if (
        breakInDay &&
        !(timeToMin(slot.end) <= timeToMin(breakInDay.from) ||
          timeToMin(slot.start) >= timeToMin(breakInDay.to))
      ) {
        continue;
      }

      const taken = appointments.find(
        a =>
          a.doctorId === doctor.id &&
          a.start === slot.start &&
          a.end === slot.end &&
          a.date
      );

      if (!taken) {
        return {
          doctor: doctor.name,
          specialization: doctor.specialization,
          day: window.day,
          start: slot.start,
          end: slot.end
        };
      }
    }
  }

  return null;
}
