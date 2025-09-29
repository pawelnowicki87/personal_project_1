import express from "express";
import * as appointmentController from "../controllers/appointmentController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate, appointmentController.getAllAppointments);
router.get("/:id", authenticate, appointmentController.getAppointmentById);
router.post("/", authenticate, appointmentController.createAppointment);
router.put("/:id", authenticate, appointmentController.updateAppointment);
router.delete("/:id", authenticate, appointmentController.deleteAppointment);

export default router;
