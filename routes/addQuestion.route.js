const express = require('express');
var cors = require('cors')
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const smtpTransport = require('nodemailer-smtp-transport');
const jwt = require('jsonwebtoken');
const addQuestions = require('../models/addQuestions');
const generateFee = require('../models/generateFee');
const subjectFee = require('../models/subjectFee');   
const config = require('../config.json');
const User = require('../models/user.model');
const tokenChecker = require("../tokenChecker");

const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport(smtpTransport({    
     service: 'gmail',
     host: 'smtp.gmail.com', 
     auth: {        
          user: 'ehtashamk40@gmail.com',        
          pass: 'khang.com'    
     }
}))

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
 

 router.post("/sendMail", function(req,res){
   var to = req.body.email,
       subject = "Meeting Link", 
       message = req.body.link;
   //options
   console.log("to : "+ to + " message :"+ message)
   const mailOptions = {
        from: 'ehtashamk40@gmail.com',
        to: to,                   // from req.body.to
        subject: subject,         //from req.body.subject
        html: message             //from req.body.message
    };
   //delivery
   transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);  
        } else {     
            console.log('Email sent: ' + info.response);  
        }   
   });
});



 router.post('/addSubjectFee' ,function async (req, res) {   // Post API for Login Tutor Account
    
   const subject =req.body.subject;
   const fee= req.body.fee;
   
   subjectFee.find({
      subject: req.body.subject,

   })
   .exec()
   .then(function (question) {
      console.log("duplicate Entry :"  + question != null )
     
         let subjectfee = new subjectFee({
            _id: new mongoose.Types.ObjectId(),
            subject: req.body.subject,
            fee: req.body.fee,
          
         });
         console.log("fee",req.body.answers);
    
    
         subjectfee.save().then(function (result ) {
          
             res.status(200).json({
                Success: result
             });
            
          
         }).catch(error => {
          return   res.status(500).json({
               error: error
            });
         });
      

   }).catch(error => {
      return   res.status(500).json({
           error: error
        });
     });
   


    


 });

















 router.post('/generateFee' , async (req, res) => {   // Post API for Login Tutor Account
    
   

   //let users = await User.find({});

 
 const student= req.body.student;
 const subject= req.body.student;
 const date= req.body.date;
 const fee= req.body.fee;


 
 generateFee.findOne({
     
   subject:req.body.subject,
   date:req.body.date,
   student:req.body.student

})
.exec()
.then(function (question) {
   console.log("duplicate Entry :"  + question )
   if(question > 0)
   {
      return res.status(200).json({
         error : "This Month Fee Voucher is Already Generated !!!"
      })
   }
   else
   {


   

      subjectFee.find({
     
      subject:req.body.subject,


   })
   .exec()
   .then(function (question) {
      console.log("duplicate Entry :"  + question[0] )
      if(question > 0)
      {
         return res.status(200).json({
            error : "This Month Fee Voucher is Already Generated !!!"
         })
      }
      else
      {
            let generateee = new generateFee({
            _id: new mongoose.Types.ObjectId(),
            student: req.body.student,
            date: req.body.date,
            fee: question[0].fee,
            subject:req.body.subject

           
         });
       
         console.log("generateee : "+ generateee);
         generateee.save().then(function (result ) {
          
             res.status(200).json({
                Success: result
             });
            
          
         }).catch(error => {
          return   res.status(200).json({
               error: error
            });
      
      }).catch(error => {
         return   res.status(200).json({
              error: error
           });
        });
      }
      
      

  
         });
      }
   })


   // generateFee.findOne({
   //    date: req.body.date
   // })
   // .exec()
   // .then(function (question) {
   //    console.log("duplicate Entry :"  + question )
   //    if(question)
   //    {
   //       return res.status(500).json({
   //          error : "This Month Fee Voucher is Already Generated !!!"
   //       })
   //    }
   //    else
   //    {
   //       let addQuestion = new addQuestions({
   //          _id: new mongoose.Types.ObjectId(),
   //          questionId: req.body.questionId,
   //          subject: req.body.subject,
   //          question: req.body.question,
   //          questionType: req.body.questionType,
   //          answerSelectionType: req.body.answerSelectionType,
   //          correctAnswer: req.body.correctAnswer,
   //          messageForCorrectAnswer: req.body.messageForCorrectAnswer,
   //          messageForIncorrectAnswer: req.body.messageForIncorrectAnswer,
   //          explanation: req.body.explanation,
   //          point: req.body.point,
   //          answers: req.body.answers,
   //       });
   //       console.log("tutor",req.body.answers);
    
    
   //       addQuestion.save().then(function (result ) {
          
   //           res.status(200).json({
   //              Success: result
   //           });
            
          
   //       }).catch(error => {
   //        return   res.status(500).json({
   //             error: error
   //          });
   //       });
   //    }

   // }).catch(error => {
   //    return   res.status(500).json({
   //         error: error
   //      });
   //   });
   


    


 });
 

 router.get('/getStudentInvoice', function (req, res) {     // GET API for getting exploring tutor 

   let student = req.query.student;
   console.log("student : "+ student)
   generateFee.find({student: student}).exec()
      .then(fees => {
         console.log("fees : "+ fees)
         if(fees.length >0 )
         {
            res.json({
              "Results": fees[0]
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

 })


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