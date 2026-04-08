// const Pharmacy = require('../models/Pharmacy'); // corrected spelling

// // CREATE - Add new pharmacy
// const createPharmacy = async (pharmacy_name, pharmacy_address, pharmacy_contact, pharmacy_town, pharmacy_license, assigned_user) => {
//     try {
//         const pharmacyDetails = new Pharmacy({
//             pharmacy_name,
//             pharmacy_address,
//             pharmacy_contact,
//             pharmacy_town,
//             pharmacy_license,
//             assigned_user
//         });

//         await pharmacyDetails.save();
//         return pharmacyDetails;
//     } catch (err) {
//         console.log("Failed to add pharmacy", err);
//         throw err;
//     }
// };

// // READ - Get all pharmacies
// const getAllPharmacies = async () => {
//     try {
//         const pharmacies = await Pharmacy.find();
//         return pharmacies;
//     } catch (err) {
//         console.log("Failed to fetch pharmacies", err);
//         throw err;
//     }
// };

// // READ - Get single pharmacy by ID
// const getPharmacyById = async (id) => {
//     try {
//         const pharmacy = await Pharmacy.findById(id);
//         return pharmacy;
//     } catch (err) {
//         console.log(`Failed to fetch pharmacy with ID ${id}`, err);
//         throw err;
//     }
// };

// // UPDATE - Update a pharmacy by ID
// const updatePharmacy = async (id, updateData) => {
//     try {
//         const updatedPharmacy = await Pharmacy.findByIdAndUpdate(id, updateData, { new: true });
//         return updatedPharmacy;
//     } catch (err) {
//         console.log(`Failed to update pharmacy with ID ${id}`, err);
//         throw err;
//     }
// };

// // DELETE - Delete a pharmacy by ID
// const deletePharmacy = async (id) => {
//     try {
//         const deletedPharmacy = await Pharmacy.findByIdAndDelete(id);
//         return deletedPharmacy;
//     } catch (err) {
//         console.log(`Failed to delete pharmacy with ID ${id}`, err);
//         throw err;
//     }
// };

// module.exports = {
//     createPharmacy,
//     getAllPharmacies,
//     getPharmacyById,
//     updatePharmacy,
//     deletePharmacy
// };
