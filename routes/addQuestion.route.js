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
      questionText: req.body.questionText
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
            questionText: req.body.questionText,
            options: req.body.options,
            correctOption: req.body.correctOption,
            status:1
         });
         console.log("tutor",req.body.options);
    
    
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

   addQuestions.find()
      .then(notes => {
         res.json({"Questions":notes});
      }).catch(err => {
         res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
         });
      });
});



router.get('/getQuestion', tokenChecker, function (req, res) {     // GET API for getting exploring tutor 
   let subject = req.query.subject;
   console.log("subject : " + subject);
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