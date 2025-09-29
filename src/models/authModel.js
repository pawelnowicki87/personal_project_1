// src/models/authModel.js
import { client } from "../config/db.js";

export const AuthModel = {
  async createUser(email, passwordHash) {
    const result = await client.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, passwordHash]
    );
    return result.rows[0];
  },

  async findByEmail(email) {
    const result = await client.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
  },

  async findById(id) {
    const result = await client.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  },
};
