import * as doctorService from "../services/doctorService.js";

/**
 * Create a new doctor
 */
export const createDoctorController = async (req, res) => {
  try {
    const doctorData = { ...req.body };

    // Handle image file
    if (req.file) {
      doctorData.photo = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      };
    }

    const doctor = await doctorService.createDoctor(doctorData);
    res.status(201).json(doctor);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Get all doctors
 */
export const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorService.getAllDoctors();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get a doctor by ID
 */
export const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await doctorService.getDoctorById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update a doctor by ID
 */
export const updateDoctorController = async (req, res) => {
  try {
    const updatedData = { ...req.body };

    // Check if file is uploaded
    if (req.file) {
      updatedData.photo = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      };
    }

    const doctor = await doctorService.updateDoctor(req.params.id, updatedData);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(doctor);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Delete a doctor by ID
 */
export const deleteDoctorController = async (req, res) => {
  try {
    const doctor = await doctorService.deleteDoctor(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ message: "Doctor deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
