const Pharmacy = require('../models/Pharmacy');

async function createPharmacy(data) {
    const pharmacy = new Pharmacy(data);
    return await pharmacy.save();
}

// Optionally, accept a query for nearby pharmacies
async function getAllPharmacies(query = {}) {
    if (query.lat && query.lng && query.radius) {
        // Geospatial query to find pharmacies within a radius (in meters)
        return await Pharmacy.find({
            location: {
                $geoWithin: {
                    $centerSphere: [
                        [parseFloat(query.lng), parseFloat(query.lat)],
                        parseFloat(query.radius) / 6378137 // radius in radians (Earth radius in meters)
                    ]
                }
            }
        }).populate('owner', 'useremail role');
    }
    return await Pharmacy.find().populate('owner', 'useremail role');
}

async function getPharmacyById(id) {
    return await Pharmacy.findById(id).populate('owner', 'useremail role');
}

async function updatePharmacy(id, updateData) {
    return await Pharmacy.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
}

async function deletePharmacy(id) {
    return await Pharmacy.findByIdAndDelete(id);
}

module.exports = {
    createPharmacy,
    getAllPharmacies,
    getPharmacyById,
    updatePharmacy,
    deletePharmacy
};
