import redisClient from "../config/redis.js";

export async function setSession(token, userId) {
  await redisClient.set(token, userId, "EX", 3600); 
}

export async function getSession(token) {
  return await redisClient.get(token);
}

export async function deleteSession(token) {
  await redisClient.del(token);
}
