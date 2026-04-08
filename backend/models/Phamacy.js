// const mongoose = require('mongoose');

// const phamacySchema = mongoose.Schema({
//     phamacy_name: {
//         type: String,
//         required: true
//     },
//     phamacy_address: {
//         type: String,
//         required: true
//     },
//     phamacy_contact: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     phamacy_town: {
//         type: String,
//         required: true
//     },
//     phamacy_license: {
//         type: String,
//         required: true,
//         unique: true 
//     },
//     assigned_user: {
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'User',
//         required: true,
//         unique: true
//     }
// })

// module.exports = mongoose.model('Phamacy', phamacySchema);