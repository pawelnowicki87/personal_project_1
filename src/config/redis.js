import Redis from "ioredis";

const redisHost = process.env.REDIS_HOST || "localhost";
const redisPort = process.env.REDIS_PORT || 6379;

const redis = new Redis({
  host: redisHost,
  port: redisPort,
});

redis.on("connect", () => {
  console.log("Connected to Redis ✅");
});

redis.on("error", (err) => {
  console.error("Redis error ❌", err);
});

export default redis;
