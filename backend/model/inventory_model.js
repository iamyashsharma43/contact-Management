const mongoose = require('mongoose');
const validator = require('validator');

const inventorySchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required.'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required.'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: 'Email is invalid.',
        },
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone Number is required.'],
        validate: {
            validator: function (v) {
                return /^[0-9]{10,15}$/.test(v);
            },
            message: 'Phone Number must be between 10 and 15 digits.',
        },
    },
    company: {
        type: String,
        default: 'N/A',
    },
    jobTitle: {
        type: String,
        default: 'N/A',
    },
});

module.exports = mongoose.model('Inventory', inventorySchema);
