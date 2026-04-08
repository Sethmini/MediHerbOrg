// models/doctor.model.js

import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    specialization: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "Hepatology",
        "Otolaryngology (ENT)",
        "Rheumatology",
        "Infectious Disease",
        "General Medicine",
        "Gastroenterology",
        "Ophthalmology",
        "Neurology",
        "Psychiatry",
        "General Surgery",
        "Immunology",
        "Endocrinology",
        "Dermatology"
      ],
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    experienceYears: {
      type: Number,
      min: 0,
      default: 0,
    },
    contactNumber: {
      type: String,
      match: [/^[0-9]{10}$/, "Invalid contact number"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      postalCode: { type: String, trim: true },
    },
    availableDays: [
      {
        type: String,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      },
    ],
    consultationTime: {
      start: { type: String, trim: true }, // e.g. "09:00 AM"
      end: { type: String, trim: true },   // e.g. "05:00 PM"
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
