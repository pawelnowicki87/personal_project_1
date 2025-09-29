import request from "supertest";
import app from "../src/app.js";

describe("🔐 Auth API", () => {
  const email = `test${Date.now()}@mail.com`;
  const password = "password123";
  let token;

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({ email, password });
    expect(res.statusCode).toBe(201);
    expect(res.body.user).toHaveProperty("email", email);
  });

  it("should login and receive a token", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email, password });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  it("should logout successfully", async () => {
    const res = await request(app)
      .post("/auth/logout")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});
