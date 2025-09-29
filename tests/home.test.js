import request from "supertest";
import app from "../src/app.js";

let token;

beforeAll(async () => {
  const email = `home${Date.now()}@mail.com`;
  const password = "password123";
  await request(app).post("/auth/register").send({ email, password });
  const loginRes = await request(app).post("/auth/login").send({ email, password });
  token = loginRes.body.token;
});

describe("🏠 Homepage", () => {
  it("should return homepage when authenticated", async () => {
    const res = await request(app)
      .get("/")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/welcome/i);
  });
});
