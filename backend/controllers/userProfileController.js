const userProfileService = require('../services/userProfileService');

// CREATE
const createProfile = async (req, res) => {
  try {
    const userProfile = await userProfileService.createUserProfile({
      ...req.body,
      user: req.params.id,
    });

    res.status(201).json({
      message: "User Profile Created Successfully",
      profile: userProfile,
    });
  } catch (err) {
    console.error("Create profile error:", err);
    const statusCode = err.statusCode || err.status || 500;
    res.status(statusCode).json({
      error: err.message || "An unexpected error occurred",
    });
  }
};

// READ ALL
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await userProfileService.getAllUserProfiles();
    res.status(200).json({
      message: "User Profiles Retrieved Successfully",
      profiles,
    });
  } catch (err) {
    console.error("Get all profiles error:", err);
    const statusCode = err.statusCode || err.status || 500;
    res.status(statusCode).json({
      error: err.message || "An unexpected error occurred",
    });
  }
};

// READ ONE by profile ID
const getProfileById = async (req, res) => {
  try {
    const profile = await userProfileService.getUserProfileById(req.params.id);
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.status(200).json({
      message: "User Profile Retrieved Successfully",
      profile,
    });
  } catch (err) {
    console.error("Get profile by ID error:", err);
    const statusCode = err.statusCode || err.status || 500;
    res.status(statusCode).json({
      error: err.message || "An unexpected error occurred",
    });
  }
};

// READ ONE by user ID
const getProfileByUserId = async (req, res) => {
  try {
    const profile = await userProfileService.getUserProfileByUserId(req.params.userId);
    if (!profile) {
      return res.status(404).json({ error: "Profile not found for this user" });
    }
    res.status(200).json({
      message: "User Profile Retrieved Successfully",
      profile,
    });
  } catch (err) {
    console.error("Get profile by user ID error:", err);
    const statusCode = err.statusCode || err.status || 500;
    res.status(statusCode).json({
      error: err.message || "An unexpected error occurred",
    });
  }
};

// UPDATE
const updateProfile = async (req, res) => {
  try {
    const updatedProfile = await userProfileService.updateUserProfile(req.params.id, req.body);
    if (!updatedProfile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.status(200).json({
      message: "User Profile Updated Successfully",
      profile: updatedProfile,
    });
  } catch (err) {
    console.error("Update profile error:", err);
    const statusCode = err.statusCode || err.status || 500;
    res.status(statusCode).json({
      error: err.message || "An unexpected error occurred",
    });
  }
};

// DELETE
const deleteProfile = async (req, res) => {
  try {
    const deletedProfile = await userProfileService.deleteUserProfile(req.params.id);
    if (!deletedProfile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.status(200).json({
      message: "User Profile Deleted Successfully",
    });
  } catch (err) {
    console.error("Delete profile error:", err);
    const statusCode = err.statusCode || err.status || 500;
    res.status(statusCode).json({
      error: err.message || "An unexpected error occurred",
    });
  }
};

module.exports = {
  createProfile,
  getAllProfiles,
  getProfileById,
  getProfileByUserId,
  updateProfile,
  deleteProfile,
};
