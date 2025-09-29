import client from "../config/db.js";

export const AvailabilityModel = {
  async create({ doctor_id, day_of_week, start_time, end_time }) {
    const result = await client.query(
      `INSERT INTO doctor_availability (doctor_id, day_of_week, start_time, end_time)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [doctor_id, day_of_week, start_time, end_time]
    );
    return result.rows[0];
  },

  async findAll() {
    const result = await client.query(
      `SELECT 
          da.availability_id,
          da.doctor_id,
          d.name AS doctor_name,
          da.day_of_week,
          da.start_time,
          da.end_time
       FROM doctor_availability da
       JOIN doctor d ON da.doctor_id = d.doctor_id
       ORDER BY da.doctor_id ASC, da.day_of_week ASC`
    );
    return result.rows;
  },

  async findById(id) {
    const result = await client.query(
      `SELECT 
          da.availability_id,
          da.doctor_id,
          d.name AS doctor_name,
          da.day_of_week,
          da.start_time,
          da.end_time
       FROM doctor_availability da
       JOIN doctor d ON da.doctor_id = d.doctor_id
       WHERE da.availability_id = $1`,
      [id]
    );
    return result.rows[0];
  }
};
