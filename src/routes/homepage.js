import express from "express";
import { getSession } from "../services/sessionService.js";

const router = express.Router();


router.get("/", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "invalid token" });

  const actualToken = token.split(" ")[1];
  const id = await getSession(actualToken);

  if (!id) return res.status(401).json({ message: "session expired or invalid" });
  if (parseInt(id) !== 20) return res.status(401).json({ message: "id from session is invalid" });

  res.send("Hello World! (homepage)");
});

export default router;
