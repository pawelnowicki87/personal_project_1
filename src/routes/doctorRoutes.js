import express from "express";
import * as doctorController from "../controllers/doctorController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate, doctorController.getAllDoctors);
router.get("/:id", authenticate, doctorController.getDoctorById);
router.post("/", authenticate, doctorController.createDoctor);
router.put("/:id", authenticate, doctorController.updateDoctor);
router.delete("/:id", authenticate, doctorController.deleteDoctor);

export default router;
