import client from "../config/db.js";

export const DoctorModel = {
  async findAll() {
    const result = await client.query(`
      SELECT doctor_id, name, email, phone, specialization_id
      FROM doctor
      ORDER BY doctor_id ASC
    `);
    return result.rows;
  },

  async findById(id) {
    const result = await client.query(
      `
      SELECT doctor_id, name, email, phone, specialization_id
      FROM doctor
      WHERE doctor_id = $1
      `,
      [id]
    );
    return result.rows[0];
  },

  async create({ name, email, phone, specialization_id }) {
    const result = await client.query(
      `
      INSERT INTO doctor (name, email, phone, specialization_id)
      VALUES ($1, $2, $3, $4)
      RETURNING doctor_id, name, email, phone, specialization_id
      `,
      [name, email, phone, specialization_id]
    );
    return result.rows[0];
  },

  async update(id, { name, email, phone, specialization_id }) {
    const result = await client.query(
      `
      UPDATE doctor
      SET name = $2, email = $3, phone = $4, specialization_id = $5
      WHERE doctor_id = $1
      RETURNING doctor_id, name, email, phone, specialization_id
      `,
      [id, name, email, phone, specialization_id]
    );
    return result.rows[0];
  },

  async delete(id) {
    await client.query("DELETE FROM doctor WHERE doctor_id = $1", [id]);
  },
};
