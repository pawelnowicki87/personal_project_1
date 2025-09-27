import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const { Client } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PG_HOST = process.env.PG_HOST || "localhost";
const PG_PORT = Number(process.env.PG_PORT || 5432);
const PG_USER = process.env.PG_USER || "postgres";
const PG_PASSWORD = process.env.PG_PASSWORD || "secret";
const PG_DB_NAME = process.env.PG_DB_NAME || "hospital_db";

const SCHEMA_PATH = path.resolve(__dirname, "schema.sql");

async function ensureDatabaseExists() {
  const client = new Client({
    host: PG_HOST,
    port: PG_PORT,
    user: PG_USER,
    password: PG_PASSWORD,
    database: "postgres",
  });
  await client.connect();

  try {
    const r = await client.query("SELECT 1 FROM pg_database WHERE datname = $1", [PG_DB_NAME]);
    if (r.rowCount === 0) {
      console.log(`Creating database "${PG_DB_NAME}"...`);
      await client.query(`CREATE DATABASE ${PG_DB_NAME}`);
      console.log(`Database "${PG_DB_NAME}" created`);
    } else {
      console.log(`Database "${PG_DB_NAME}" already exists`);
    }
  } catch (err) {
    if (err.code === "42P04") {
      console.log(`Database "${PG_DB_NAME}" already exists`);
    } else {
      console.error("Error creating database", err);
      throw err;
    }
  } finally {
    await client.end();
  }
}

async function applySchema() {
  const sql = await fs.readFile(SCHEMA_PATH, "utf8");
  const client = new Client({
    host: PG_HOST,
    port: PG_PORT,
    user: PG_USER,
    password: PG_PASSWORD,
    database: PG_DB_NAME,
  });
  await client.connect();

  try {
    await client.query("BEGIN");
    await client.query(sql);
    await client.query("COMMIT");
    console.log("Schema applied successfully");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error applying schema", err);
    throw err;
  } finally {
    await client.end();
  }
}

(async () => {
  try {
    await ensureDatabaseExists();
    await applySchema();
  } catch (e) {
    process.exitCode = 1;
  }
})();
