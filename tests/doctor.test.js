import request from "supertest";
import app from "../src/app.js";

let token;

beforeAll(async () => {
  const email = `doc${Date.now()}@mail.com`;
  const password = "password123";
  await request(app).post("/auth/register").send({ email, password });
  const loginRes = await request(app).post("/auth/login").send({ email, password });
  token = loginRes.body.token;
});

describe("👨‍⚕️ Doctor API", () => {
  it("should create a doctor", async () => {
    const uniqueEmail = `dr${Date.now()}@example.com`;
    const res = await request(app)
      .post("/doctors")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Dr. Smith",
        email: uniqueEmail,
        phone: "123456789",
        specialization_id: 1,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("doctor_id");
    expect(res.body).toHaveProperty("email", uniqueEmail);
  });

  it("should list all doctors", async () => {
    const res = await request(app)
      .get("/doctors")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty("doctor_id");
    expect(res.body[0]).toHaveProperty("name");
  });
});
