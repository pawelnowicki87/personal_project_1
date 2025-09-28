import request from "supertest";
import app from "../src/app.js";

describe("🏠 Protected Homepage", () => {
  let token;

  beforeAll(async () => {
    const email = `protected${Date.now()}@example.com`;
    const password = "password123";

    await request(app).post("/register").send({ email, password });
    const res = await request(app).post("/login").send({ email, password });
    token = res.body.token;
  });

  it("should return 401 if no token provided", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(401);
  });

  it("should return homepage content with valid token", async () => {
    const res = await request(app).get("/").set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/welcome to homepage!/i);
  });
});
