import bcrypt from "bcrypt";
import { AuthModel } from "../models/authModel.js";
import * as redisService from "../utils/redisService.js";

export async function register(email, password) {
  const existingUser = await AuthModel.findByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await AuthModel.createUser(email, hashedPassword);

  return { id: newUser.id, email: newUser.email };
}

export async function login(email, password) {
  const user = await AuthModel.findByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Invalid email or password");
  }

  const token = `${user.id}-${Date.now()}`;

  await redisService.setSession(token, user.id);

  return token;
}

export async function logout(token) {
  await redisService.deleteSession(token);
  return true;
}

export async function getUserFromToken(userId) {
  const user = await AuthModel.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return { id: user.id, email: user.email };
}
