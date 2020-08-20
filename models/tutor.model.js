const mongoose = require('mongoose');
const validator = require('validator')
const tutor = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    phone: { type: String, required: true, minlength: 11 },
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
        minlength: 3
    },
    expertise: {
        type: String,
        required: true,
        minlength: 3
    },
    accountType: {
        type: String,
        required: true
    },
    statusActive: {
        type: Boolean,
        required: true
    },
},
    { timestamps: true }
);

module.exports = mongoose.model('Tutor', tutor);