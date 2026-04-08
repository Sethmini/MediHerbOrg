const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');

// Create a user profile for a given user ID
router.post('/:id', userProfileController.createProfile);

// Get all user profiles
router.get('/', userProfileController.getAllProfiles);

// Get a user profile by profile ID
router.get('/profile/:id', userProfileController.getProfileById);

// Get a user profile by user ID (foreign key)
router.get('/user/:userId', userProfileController.getProfileByUserId);

// Update a user profile by profile ID
router.put('/:id', userProfileController.updateProfile);

// Delete a user profile by profile ID
router.delete('/:id', userProfileController.deleteProfile);

module.exports = router;
