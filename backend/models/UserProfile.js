/**
 * 
 * Class for User Profiles
 */

const mongoose = require('mongoose')

const userProfileSchema = mongoose.Schema({
    first_name: {
        type: String, 
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Profile', userProfileSchema);