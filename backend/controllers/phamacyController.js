// const pharmacyService = require('../services/phamacyService');

// // CREATE
// const createPharmacy = async (req, res) => {
//     try {
//         const {
//             pharmacy_name,
//             pharmacy_address,
//             pharmacy_contact,
//             pharmacy_town,
//             pharmacy_license,
//             assigned_user
//         } = req.body;

//         const pharmacy = await pharmacyService.addPharmacyDetails(
//             pharmacy_name,
//             pharmacy_address,
//             pharmacy_contact,
//             pharmacy_town,
//             pharmacy_license,
//             assigned_user
//         );

//         res.status(201).json(pharmacy);
//     } catch (err) {
//         const statusCode = err.statusCode || err.status || 500;
//         res.status(statusCode).json({ error: err.message || "An unexpected error occurred" });
//     }
// };

// // READ ALL
// const getAllPharmacies = async (req, res) => {
//     try {
//         const pharmacies = await pharmacyService.getAllPharmacies();
//         res.status(200).json(pharmacies);
//     } catch (err) {
//         const statusCode = err.statusCode || err.status || 500;
//         res.status(statusCode).json({ error: err.message || "An unexpected error occurred" });
//     }
// };

// // READ ONE
// const getPharmacyById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const pharmacy = await pharmacyService.getPharmacyById(id);

//         if (!pharmacy) {
//             return res.status(404).json({ error: "Pharmacy not found" });
//         }

//         res.status(200).json(pharmacy);
//     } catch (err) {
//         const statusCode = err.statusCode || err.status || 500;
//         res.status(statusCode).json({ error: err.message || "An unexpected error occurred" });
//     }
// };

// // UPDATE
// const updatePharmacy = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const updateData = req.body;

//         const updatedPharmacy = await pharmacyService.updatePharmacy(id, updateData);

//         if (!updatedPharmacy) {
//             return res.status(404).json({ error: "Pharmacy not found" });
//         }

//         res.status(200).json(updatedPharmacy);
//     } catch (err) {
//         const statusCode = err.statusCode || err.status || 500;
//         res.status(statusCode).json({ error: err.message || "An unexpected error occurred" });
//     }
// };

// // DELETE
// const deletePharmacy = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const deletedPharmacy = await pharmacyService.deletePharmacy(id);

//         if (!deletedPharmacy) {
//             return res.status(404).json({ error: "Pharmacy not found" });
//         }

//         res.status(200).json({ message: "Pharmacy deleted successfully" });
//     } catch (err) {
//         const statusCode = err.statusCode || err.status || 500;
//         res.status(statusCode).json({ error: err.message || "An unexpected error occurred" });
//     }
// };

// module.exports = {
//     createPharmacy,
//     getAllPharmacies,
//     getPharmacyById,
//     updatePharmacy,
//     deletePharmacy
// };
