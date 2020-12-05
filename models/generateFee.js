const mongoose = require('mongoose');
const validator = require('validator')


const GenerateFee = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    student: { type: String, required: true },
    subject: { type: String, required: true },
    fee:{ type: String ,required: true},
    date:{ type: String ,required: true,}
    
},
{ timestamps: true });


module.exports = mongoose.model('generateFee', GenerateFee);