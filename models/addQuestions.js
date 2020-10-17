const mongoose = require('mongoose');
const validator = require('validator')


const AddQuestions = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    questionId: { type: String },
    subject: { type: String, require: true },
    question: { type: String, require: true },
    questionType: { type: String, required: true  },
    answerSelectionType: { type: String, required: true  },
    answers: { type: Array, required: true },
    correctAnswer: { type: String, required: true },
    messageForCorrectAnswer: { type: String, required: true },
    messageForIncorrectAnswer: { type: String, required: true },
    explanation: { type: String, required: true },
    point: { type: String, required: true },
    
},
{ timestamps: true });


module.exports = mongoose.model('addQuestionzz', AddQuestions);