import { getSession } from "../services/sessionService.js";

export async function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }
  
  const userId = await getSession(token);
  if (!userId) {
    return res.status(401).json({ message: "Invalid or expired session" });
  }

  req.userId = userId;
  next();
}
