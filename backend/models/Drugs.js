const mongoose = require('mongoose');

const drugSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    batchNumber: {
        type: String,
        required: true,
        unique: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    quantityInStock: {
        type: Number,
        required: true,
        min: 0
    },
    pharmacy: {   // Reference to Pharmacy
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pharmacy',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Drug', drugSchema);
