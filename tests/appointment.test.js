import request from "supertest";
import app from "../src/app.js";

let token;

beforeAll(async () => {
  const email = `appt${Date.now()}@mail.com`;
  const password = "password123";
  await request(app).post("/auth/register").send({ email, password });
  const loginRes = await request(app).post("/auth/login").send({ email, password });
  token = loginRes.body.token;
});

describe("📅 Appointment API", () => {
  it("should create an appointment", async () => {
    const res = await request(app)
      .post("/appointments")
      .set("Authorization", `Bearer ${token}`)
      .send({
        patient_id: 1,
        doctor_id: 1,
        startTime: "2026-01-15T10:00:00Z",
        endTime: "2026-01-15T11:00:00Z",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("appointment_id");
  });

  it("should list all appointments", async () => {
    const res = await request(app)
      .get("/appointments")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
