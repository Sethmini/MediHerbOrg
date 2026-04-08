const express = require("express");
const router = express.Router();
const multer = require("multer");

// Load controller (CommonJS)
const doctorController = require("../controllers/doctorController");

// Use memory storage so the image becomes a Buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create a new doctor (photo upload supported)
router.post("/", upload.single("photo"), doctorController.createDoctorController);

// Get all doctors
router.get("/", doctorController.getAllDoctorsController);

// Get a doctor by ID
router.get("/:id", doctorController.getDoctorByIdController);

// Update a doctor by ID (supports new image upload)
router.put("/:id", upload.single("photo"), doctorController.updateDoctorController);

// Delete a doctor
router.delete("/:id", doctorController.deleteDoctorController);

module.exports = router;
