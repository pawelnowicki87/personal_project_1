import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate, (req, res) => {
  res.json({ message: `Hello user ${req.userId}, welcome to homepage!` });
});

export default router;
