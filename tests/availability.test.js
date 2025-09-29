import request from "supertest";
import app from "../src/app.js";

let token;

beforeAll(async () => {
  const email = `avail${Date.now()}@mail.com`;
  const password = "password123";
  await request(app).post("/auth/register").send({ email, password });
  const loginRes = await request(app).post("/auth/login").send({ email, password });
  token = loginRes.body.token;
});

describe("📆 Availability API", () => {
  it("should get doctor availability", async () => {
    const res = await request(app)
      .get("/availability/1")
      .set("Authorization", `Bearer ${token}`);
    expect([200, 404]).toContain(res.statusCode);
  });
});
