const express = require('express');
const router = express.Router();
const drugController = require('../controllers/drugController');

// CRUD routes
router.post('/', drugController.createDrug);
router.get('/', drugController.getAllDrugs);
router.get('/:id', drugController.getDrugById);
router.get('/pharmacy/:pharmacyId', drugController.getDrugsByPharmacy);
router.put('/:id', drugController.updateDrug);
router.delete('/:id', drugController.deleteDrug);

module.exports = router;
