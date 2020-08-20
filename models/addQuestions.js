const mongoose = require('mongoose');
const validator = require('validator')


const AddQuestions = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    questionId: { type: String },
    subject: { type: String, require: true },
    questionText: { type: String, required: true  },
    options: { type: Array, required: true },
    correctOption: { type: String, required: true },
    status: { type: Boolean, required: true },
    
},
{ timestamps: true });


module.exports = mongoose.model('addQuestions', AddQuestions);