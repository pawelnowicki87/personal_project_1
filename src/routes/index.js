import express from "express";

import authRoutes from "./authRoutes.js";
import patientRoutes from "./patientRoutes.js";
import doctorRoutes from "./doctorRoutes.js";
import appointmentRoutes from "./appointmentRoutes.js";
import availabilityRoutes from "./availabilityRoutes.js";
import homeRoutes from "./homeRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/patients", patientRoutes);
router.use("/doctors", doctorRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/availability", availabilityRoutes);
router.use("/", homeRoutes);

export default router;
