import redis from "../config/redis.js";

const PREFIX = "session:";

export async function createSession(sessionId, userId, ttl = 3600) {
  await redis.setex(PREFIX + sessionId, ttl, userId);
}

export async function getSession(sessionId) {
  return await redis.get(PREFIX + sessionId);
}

export async function deleteSession(sessionId) {
  return await redis.del(PREFIX + sessionId);
}
