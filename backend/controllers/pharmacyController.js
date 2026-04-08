const pharmacyService = require('../services/pharmacyService');

// Helper to format coordinates if latitude & longitude are provided
function formatLocation(body) {
    if (body.latitude != null && body.longitude != null) {
        body.location = {
            type: 'Point',
            coordinates: [parseFloat(body.longitude), parseFloat(body.latitude)]
        };
        delete body.latitude;
        delete body.longitude;
    }
}

// Create Pharmacy
async function createPharmacy(req, res) {
    try {
        formatLocation(req.body); // format coordinates
        const pharmacy = await pharmacyService.createPharmacy(req.body);
        res.status(201).json(pharmacy);
    } catch (err) {
        console.error(err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message });
        }
        res.status(500).json({ error: 'Failed to create pharmacy' });
    }
}

// Get All Pharmacies
async function getAllPharmacies(req, res) {
    try {
        const pharmacies = await pharmacyService.getAllPharmacies();
        res.json(pharmacies);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch pharmacies' });
    }
}

// Get Pharmacy by ID
async function getPharmacyById(req, res) {
    try {
        const pharmacy = await pharmacyService.getPharmacyById(req.params.id);
        if (!pharmacy) return res.status(404).json({ error: 'Pharmacy not found' });
        res.json(pharmacy);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch pharmacy' });
    }
}

// Update Pharmacy
async function updatePharmacy(req, res) {
    try {
        formatLocation(req.body); // format coordinates
        const updated = await pharmacyService.updatePharmacy(req.params.id, req.body);
        if (!updated) return res.status(404).json({ error: 'Pharmacy not found' });
        res.json(updated);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message });
        }
        res.status(500).json({ error: 'Failed to update pharmacy' });
    }
}

// Delete Pharmacy
async function deletePharmacy(req, res) {
    try {
        const deleted = await pharmacyService.deletePharmacy(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Pharmacy not found' });
        res.json({ message: 'Pharmacy deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete pharmacy' });
    }
}

module.exports = {
    createPharmacy,
    getAllPharmacies,
    getPharmacyById,
    updatePharmacy,
    deletePharmacy
};
