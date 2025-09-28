import pg from "pg";

const { Client } = pg;
const MAX_RETRIES = 10;
const WAIT_MS = 3000;

async function waitForDB() {
  for (let i = 1; i <= MAX_RETRIES; i++) {
    try {
      const client = new Client({
        host: process.env.POSTGRES_HOST || "db",
        port: process.env.POSTGRES_PORT || 5432,
        user: process.env.POSTGRES_USER || "postgres",
        password: process.env.POSTGRES_PASSWORD || "secret",
        database: process.env.POSTGRES_DB || "hospital_db",
      });
      await client.connect();
      console.log("PostgreSQL is ready!");
      await client.end();
      return;
    } catch {
      console.log(`Waiting for DB... attempt ${i}/${MAX_RETRIES}`);
      await new Promise((res) => setTimeout(res, WAIT_MS));
    }
  }
  console.error("PostgreSQL did not become ready in time.");
  process.exit(1);
}

await waitForDB();
