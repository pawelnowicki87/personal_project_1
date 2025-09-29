import "dotenv/config";
import pkg from "pg";

const { Client } = pkg;

const DB_CONFIG = {
  user: process.env.POSTGRES_USER || "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  database: process.env.POSTGRES_DB || "hospital_db",
  password: process.env.POSTGRES_PASSWORD || "secret",
  port: process.env.POSTGRES_PORT ? Number(process.env.POSTGRES_PORT) : 5432,
};

console.log("DB CONFIG:", DB_CONFIG);

export const client = new Client(DB_CONFIG);

try {
  await client.connect();
  console.log("Connected to PostgreSQL");
} catch (err) {
  console.error("Database connection failed:", err.message);
  process.exit(1);
}

export default client;
