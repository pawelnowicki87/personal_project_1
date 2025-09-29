import request from "supertest";
import app from "../src/app.js";

let token;

beforeAll(async () => {
  const email = `pat${Date.now()}@mail.com`;
  const password = "password123";
  await request(app).post("/auth/register").send({ email, password });
  const loginRes = await request(app).post("/auth/login").send({ email, password });
  token = loginRes.body.token;
});

describe("🩺 Patient API", () => {
  let patientId;

  it("should create a patient", async () => {
    const res = await request(app)
      .post("/patients")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "John Doe",
        email: `john${Date.now()}@mail.com`,
        phone: "123456789",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("patient_id");
    expect(res.body).toHaveProperty("name", "John Doe");
    patientId = res.body.patient_id;
  });

  it("should get patient by ID", async () => {
    const res = await request(app)
      .get(`/patients/${patientId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("patient_id", patientId);
    expect(res.body).toHaveProperty("email");
    expect(res.body).toHaveProperty("name");
  });
});
