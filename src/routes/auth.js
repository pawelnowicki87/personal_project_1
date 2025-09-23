import express from "express";
import { generateSessionId } from "../utils/token.js";
import { createSession, deleteSession } from "../services/sessionService.js";

const router = express.Router();

router.post("/auth", async (req, res) => {
  if (!req.body.id) return res.status(401).json({ message: "unauthorized" });

  const id = req.body.id;
  const sessionId = generateSessionId();

  await createSession(sessionId, id, 3600);

  res.status(200).json({ token: sessionId });
});

router.post("/login", async (req, res) => {
  if (!req.body.id) return res.status(401).json({ message: "unauthorized" });

  const id = req.body.id;
  const sessionId = generateSessionId();

  await createSession(sessionId, id, 3600);

  res.status(200).json({ token: sessionId });
});


router.post("/logout", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.status(400).json({ message: "no token provided" });

  const actualToken = token.split(" ")[1];
  await deleteSession(actualToken);

  res.status(200).json({ message: "logged out" });
});

export default router;
