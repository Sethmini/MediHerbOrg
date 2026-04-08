import Doctor from "../models/Doctor.js";

export const createDoctor = async (doctorData) => {
  const doctor = new Doctor(doctorData);
  return await doctor.save();
};

export const getAllDoctors = async () => {
  return await Doctor.find();
};

export const getDoctorById = async (id) => {
  return await Doctor.findById(id);
};

export const updateDoctor = async (id, updateData) => {
  return await Doctor.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

export const deleteDoctor = async (id) => {
  return await Doctor.findByIdAndDelete(id);
};
