import * as redisService from "../utils/redisService.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = await redisService.getSession(token);
    if (!userId) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.userId = userId;
    next();
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
