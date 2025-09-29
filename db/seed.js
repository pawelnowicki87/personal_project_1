import client from "../src/config/db.js";

async function seed() {
  try {
    console.log("Starting seed...");

    await client.query("BEGIN");

    await client.query("TRUNCATE TABLE appointment RESTART IDENTITY CASCADE");
    await client.query("TRUNCATE TABLE doctor_availability RESTART IDENTITY CASCADE");
    await client.query("TRUNCATE TABLE doctor RESTART IDENTITY CASCADE");
    await client.query("TRUNCATE TABLE patient RESTART IDENTITY CASCADE");
    await client.query("TRUNCATE TABLE specialization RESTART IDENTITY CASCADE");
    await client.query("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
    console.log("🧹 Tables truncated.");

    await client.query(
      "INSERT INTO specialization (name) VALUES ('Cardiology'), ('Dermatology')"
    );
    console.log("Inserted specializations: 2");

    await client.query(
      `
      INSERT INTO doctor (name, email, phone, specialization_id)
      VALUES 
        ('Dr. Smith', 'smith@example.com', '123456789', 1),
        ('Dr. Brown', 'brown@example.com', '987654321', 2)
      `
    );
    console.log("Inserted doctors: 2");

    await client.query(
      `
      INSERT INTO patient (name, email, phone)
      VALUES 
        ('Alice Johnson', 'alice@example.com', '555123123'),
        ('Bob Martin', 'bob@example.com', '555987987')
      `
    );
    console.log("Inserted patients: 2");

    await client.query(
      `
      INSERT INTO doctor_availability (doctor_id, day_of_week, start_time, end_time)
      VALUES
        (1, 1, '09:00:00', '17:00:00'),
        (2, 2, '10:00:00', '16:00:00')
      `
    );
    console.log("Inserted availability");

    await client.query("COMMIT");
    console.log("Seed completed successfully!");
  } catch (e) {
    await client.query("ROLLBACK");
    console.error("Seed failed:", e);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seed();
