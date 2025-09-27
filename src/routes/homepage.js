import express from "express";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware, (req, res) => {
  res.send(`Hello user ${req.userId}, welcome to homepage!`);
});

export default router;
