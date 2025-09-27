import { redis } from "../config/redis.js";

export async function createSession(sessionId, userId, ttl = 3600) {
  await redis.set(sessionId, userId, "EX", ttl);
}

export async function getSession(sessionId) {
  return await redis.get(sessionId);
}

export async function deleteSession(sessionId) {
  await redis.del(sessionId);
}
