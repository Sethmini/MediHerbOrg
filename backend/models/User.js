const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    useremail: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin', 'pharmacist']
    }
},
     { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);