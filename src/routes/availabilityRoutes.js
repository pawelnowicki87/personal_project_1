import express from "express";
import * as availabilityController from "../controllers/availabilityController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:doctorId", authenticate, availabilityController.getDoctorAvailability);
router.post("/:doctorId", authenticate, availabilityController.setDoctorAvailability);
router.put("/:doctorId", authenticate, availabilityController.updateDoctorAvailability);
router.delete("/:doctorId", authenticate, availabilityController.deleteDoctorAvailability);

export default router;
