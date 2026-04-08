const drugService = require('../services/drugService');

class DrugController {
    async createDrug(req, res) {
        try {
            const drug = await drugService.createDrug(req.body);
            res.status(201).json(drug);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAllDrugs(req, res) {
        try {
            const drugs = await drugService.getAllDrugs();
            res.json(drugs);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getDrugById(req, res) {
        try {
            const drug = await drugService.getDrugById(req.params.id);
            if (!drug) return res.status(404).json({ message: 'Drug not found' });
            res.json(drug);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getDrugsByPharmacy(req, res) {
        try {
            const drugs = await drugService.getDrugsByPharmacy(req.params.pharmacyId);
            res.json(drugs);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateDrug(req, res) {
        try {
            const updatedDrug = await drugService.updateDrug(req.params.id, req.body);
            if (!updatedDrug) return res.status(404).json({ message: 'Drug not found' });
            res.json(updatedDrug);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteDrug(req, res) {
        try {
            const deleted = await drugService.deleteDrug(req.params.id);
            if (!deleted) return res.status(404).json({ message: 'Drug not found' });
            res.json({ message: 'Drug deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new DrugController();
