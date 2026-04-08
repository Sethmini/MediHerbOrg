/**
 * User Profile Service
 */

const UserProfile = require('../models/UserProfile');

/**
 * Create a User Profile relevant for User
 */
const createUserProfile = async (profileData) => {
  try {
    const userProfile = new UserProfile(profileData);
    await userProfile.save();
    return userProfile;
  } catch (error) {
    console.log("Failed to create User Profile", error);
    throw error;
  }
};

/**
 * Get user profile by profile ID
 */
const getUserProfileById = async (id) => {
  try {
    const userProfile = await UserProfile.findById(id);
    return userProfile;
  } catch (error) {
    console.log("Failed to fetch user profile by ID", error);
    throw error;
  }
};

/**
 * Get all user profiles
 */
const getAllUserProfiles = async () => {
  try {
    const profiles = await UserProfile.find().populate("user", "useremail role");
    return profiles;
  } catch (error) {
    console.log("Failed to fetch user profiles", error);
    throw error;
  }
};

/**
 * Get user profile by user ID (foreign key)
 */
const getUserProfileByUserId = async (userId) => {
  try {
    const userProfile = await UserProfile.findOne({ user: userId }).populate("user", "useremail role");
    return userProfile;
  } catch (error) {
    console.log("Failed to fetch user profile by user ID", error);
    throw error;
  }
};

/**
 * Update a user profile by ID
 */
const updateUserProfile = async (id, updateData) => {
  try {
    const updatedProfile = await UserProfile.findByIdAndUpdate(id, updateData, { new: true });
    return updatedProfile;
  } catch (error) {
    console.log("Failed to update user profile", error);
    throw error;
  }
};

/**
 * Delete a user profile by ID
 */
const deleteUserProfile = async (id) => {
  try {
    const deletedProfile = await UserProfile.findByIdAndDelete(id);
    return deletedProfile;
  } catch (error) {
    console.log("Failed to delete user profile", error);
    throw error;
  }
};

module.exports = {
  createUserProfile,
  getUserProfileById,
  getAllUserProfiles,
  getUserProfileByUserId,
  updateUserProfile,
  deleteUserProfile,
};
