const mongoose = require('mongoose');
const validator = require('validator')


const SubjectFee = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    subject: { type: String },
    fee:{ type: String }
    
},
{ timestamps: true });


module.exports = mongoose.model('subjectFee', SubjectFee);