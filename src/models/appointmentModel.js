import client from "../config/db.js";

export const AppointmentModel = {
  async createAppointment(patientId, doctorId, startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const dateISO = start.toISOString().substring(0, 10);
    const startHHMMSS = start.toISOString().substring(11, 19);
    const endHHMMSS = end.toISOString().substring(11, 19);

    const result = await client.query(
      `
      INSERT INTO appointment (patient_id, doctor_id, date, start_time, end_time)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [patientId, doctorId, dateISO, startHHMMSS, endHHMMSS]
    );
    return result.rows[0];
  },

  async findById(id) {
    const result = await client.query(
      `
      SELECT 
        a.appointment_id,
        a.date,
        a.start_time,
        a.end_time,
        a.status,
        p.patient_id,
        p.name AS patient_name,
        d.doctor_id,
        d.name AS doctor_name
      FROM appointment a
      JOIN patient p ON a.patient_id = p.patient_id
      JOIN doctor d ON a.doctor_id = d.doctor_id
      WHERE a.appointment_id = $1
      `,
      [id]
    );
    return result.rows[0];
  },

  async findAll() {
    const result = await client.query(
      `
      SELECT 
        a.appointment_id,
        a.date,
        a.start_time,
        a.end_time,
        a.status,
        p.patient_id,
        p.name AS patient_name,
        d.doctor_id,
        d.name AS doctor_name
      FROM appointment a
      JOIN patient p ON a.patient_id = p.patient_id
      JOIN doctor d ON a.doctor_id = d.doctor_id
      ORDER BY a.date ASC, a.start_time ASC
      `
    );
    return result.rows;
  },

  async findByDoctorAndTime(doctorId, startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const dateISO = start.toISOString().substring(0, 10);
    const startHHMMSS = start.toISOString().substring(11, 19);
    const endHHMMSS = end.toISOString().substring(11, 19);

    const result = await client.query(
      `
      SELECT 1
      FROM appointment
      WHERE doctor_id = $1
        AND date = $2
        AND start_time < $4
        AND end_time > $3
      LIMIT 1
      `,
      [doctorId, dateISO, startHHMMSS, endHHMMSS]
    );
    return result.rows;
  },

  async deleteAppointment(id) {
    await client.query("DELETE FROM appointment WHERE appointment_id = $1", [id]);
  },
};
