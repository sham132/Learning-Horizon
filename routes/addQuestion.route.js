const express = require('express');
var cors = require('cors')
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const addQuestions = require('../models/addQuestions');
const config = require('../config.json');
const tokenChecker = require("../tokenChecker");


router.post('/addQuestionAnswer', tokenChecker ,function async (req, res) {   // Post API for Login Tutor Account
    
   
   addQuestions.findOne({
      question: req.body.question
   })
   .exec()
   .then(function (question) {
      console.log("duplicate Entry :"  + question )
      if(question)
      {
         return res.status(500).json({
            error : "Duplicate entry for Question!!"
         })
      }
      else
      {
         let addQuestion = new addQuestions({
            _id: new mongoose.Types.ObjectId(),
            questionId: req.body.questionId,
            subject: req.body.subject,
            question: req.body.question,
            questionType: req.body.questionType,
            answerSelectionType: req.body.answerSelectionType,
            correctAnswer: req.body.correctAnswer,
            messageForCorrectAnswer: req.body.messageForCorrectAnswer,
            messageForIncorrectAnswer: req.body.messageForIncorrectAnswer,
            explanation: req.body.explanation,
            point: req.body.point,
            answers: req.body.answers,
         });
         console.log("tutor",req.body.answers);
    
    
         addQuestion.save().then(function (result ) {
          
             res.status(200).json({
                Success: result
             });
            
          
         }).catch(error => {
          return   res.status(500).json({
               error: error
            });
         });
      }

   }).catch(error => {
      return   res.status(500).json({
           error: error
        });
     });
   


    


 });
 



router.get('/getAllQuestion', tokenChecker, function (req, res) {     // GET API for getting exploring tutor 



   let subject = req.query.subject;
   addQuestions.find({subject: subject}).exec()
      .then(notes => {
         console.log("notes : "+ notes)
         if(notes.length >0 )
         {
            res.json({
               "quizTitle": "Learning Horizon Quiz Portal For Tutor's",
               "quizSynopsis": "Learning Horizon started in 2000 with Speech & Drama as well as camps primarily for preschool children. Our trainers are hand-picked and undergo extensive in-house training with regular assessments.",
               "questions":notes
            
            });
         }
         else
         {
            res.send(false);
         }
        
      }).catch(err => {
         res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
         });
      });
});



router.get('/getQuestion', tokenChecker, function (req, res) {     // GET API for getting exploring tutor 
   let subject = req.query.subject.toLowerCase();
   console.log("subject : " + subject.toLowerCase());
   addQuestions.find({subject: subject}).exec()
      .then(notes => {
         console.log(notes)
         res.json({"Questions":notes});
      }).catch(err => {
         res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
         });
      });
});






module.exports = router;