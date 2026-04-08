const express = require('express');
const router = express.Router();
const pharmacyController = require('../controllers/pharmacyController');

// Create a pharmacy
router.post('/', pharmacyController.createPharmacy);

// Get all pharmacies (optionally near a location)
router.get('/', pharmacyController.getAllPharmacies);

// Get pharmacy by ID
router.get('/:id', pharmacyController.getPharmacyById);

// Update pharmacy
router.put('/:id', pharmacyController.updatePharmacy);

// Delete pharmacy
router.delete('/:id', pharmacyController.deletePharmacy);

module.exports = router;
