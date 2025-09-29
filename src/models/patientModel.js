import client from "../config/db.js";

export const PatientModel = {
  async findAll() {
    const result = await client.query(`
      SELECT patient_id, name, email, phone
      FROM patient
      ORDER BY patient_id ASC
    `);
    return result.rows;
  },

  async findById(id) {
    const result = await client.query(
      `
      SELECT patient_id, name, email, phone
      FROM patient
      WHERE patient_id = $1
      `,
      [id]
    );
    return result.rows[0];
  },

  async create({ name, email, phone }) {
    const result = await client.query(
      `
      INSERT INTO patient (name, email, phone)
      VALUES ($1, $2, $3)
      RETURNING patient_id, name, email, phone
      `,
      [name, email, phone]
    );
    return result.rows[0];
  },

  async update(id, { name, email, phone }) {
    const result = await client.query(
      `
      UPDATE patient
      SET name = $2, email = $3, phone = $4
      WHERE patient_id = $1
      RETURNING patient_id, name, email, phone
      `,
      [id, name, email, phone]
    );
    return result.rows[0];
  },

  async delete(id) {
    await client.query("DELETE FROM patient WHERE patient_id = $1", [id]);
  },
};
