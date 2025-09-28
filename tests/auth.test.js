import request from "supertest";
import app from "../src/app.js";

let token;

describe("🔐 Auth API", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/register")
      .send({
        email: `test${Date.now()}@example.com`,
        password: "password123",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.user).toHaveProperty("id");
    expect(res.body.user).toHaveProperty("email");
  });

  it("should login with valid credentials", async () => {
    const email = `login${Date.now()}@example.com`;
    const password = "password123";

    // najpierw rejestrujemy użytkownika
    await request(app).post("/register").send({ email, password });

    // teraz logujemy się
    const res = await request(app).post("/login").send({ email, password });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");

    token = res.body.token;
  });

  it("should reject login with invalid password", async () => {
    const email = `fail${Date.now()}@example.com`;
    await request(app).post("/register").send({ email, password: "correctpass" });

    const res = await request(app).post("/login").send({
      email,
      password: "wrongpass",
    });

    expect(res.statusCode).toBe(401);
  });

  it("should logout successfully", async () => {
    const res = await request(app)
      .post("/logout")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/Logged out/);
  });
});
