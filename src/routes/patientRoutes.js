import express from "express";
import * as patientController from "../controllers/patientController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate, patientController.getAllPatients);
router.get("/:id", authenticate, patientController.getPatientById);
router.post("/", authenticate, patientController.createPatient);
router.put("/:id", authenticate, patientController.updatePatient);
router.delete("/:id", authenticate, patientController.deletePatient);

export default router;
