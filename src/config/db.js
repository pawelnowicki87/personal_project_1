import pkg from "pg";
const { Client } = pkg;

export const client = new Client({
  user: process.env.POSTGRES_USER || "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  database: process.env.POSTGRES_DB || "postgres",
  password: process.env.POSTGRES_PASSWORD || "1234qwer",
  port: process.env.POSTGRES_PORT || 5432,
});

await client.connect();
console.log("Connected to PostgreSQL ✅");
