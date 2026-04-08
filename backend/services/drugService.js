const Drug = require('../models/Drugs');

class DrugService {
    async createDrug(data) {
        const drug = new Drug(data);
        return await drug.save();
    }

    async getAllDrugs() {
        return await Drug.find().populate('pharmacy');
    }

    async getDrugsByPharmacy(pharmacyId) {
        return await Drug.find({ pharmacy: pharmacyId }).populate('pharmacy');
    }

    async getDrugById(id) {
        return await Drug.findById(id).populate('pharmacy');
    }

    async updateDrug(id, updateData) {
        return await Drug.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteDrug(id) {
        return await Drug.findByIdAndDelete(id);
    }
}

module.exports = new DrugService();
