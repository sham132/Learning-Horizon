const mongoose = require('mongoose');
const validator = require('validator')
const admin = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    phone: { type: String, required: true, minlength: 7 },
    address: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid!')
            }
        }

    },
    password: {
        type: String,
        required: true,
        minlength: 7
    },
    accountType: {
        type: String,
        required: true
    },
},
    { timestamps: true }
);

module.exports = mongoose.model('Admin', admin);