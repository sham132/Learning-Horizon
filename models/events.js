const mongoose = require('mongoose');
const validator = require('validator')
const Events = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    text: { type: String, required: true },
    start: { type: String, required: true, minlength: 7 },
    end: { type: String, required: true, minlength: 7 },
    email: { type: String, required: true },
   
   
},
    { timestamps: true }
);

module.exports = mongoose.model('SchedualingEvents', Events);