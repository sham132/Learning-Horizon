const express = require('express');
var cors = require('cors')
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const events = require('../models/events');
const config = require('../config.json');
const tokenChecker = require("../tokenChecker");


router.post('/AddEvents', function (req, res) {    // POST Signup API for Turor Signup

    if (!req.body.text) {
       return res.json({
          message: "eventName can't be empty"
       })
    }
 

    events.findOne({
        text: req.body.text
     })
     .exec()
     .then(function (error,docs) {
         console.log(docs)
        if(error)
        {
           return res.status(500).json({
              error : "Duplicate entry for Event!!"
           })
        }
         else {
          if (docs!= undefined) {
             return res.status(422).json({
                message: "Event Already Exist"
             });
          } else {
            const event = new events({
               _id: new mongoose.Types.ObjectId(),
               text: req.body.text,
               start: req.body.start,
               end: req.body.end,
               email: req.body.email,   // for start tutor status will be false, after passing the test we'll update the status as true

            });
            console.log("tutor",event);
            event.save().then(function (result) {
               console.log(result);
               res.status(200).json({
                  success: 'New Event has been created'
               });
            }).catch(error => {
               res.status(500).json({
                  error: error
               });
            });
         }
       }
 
    });
 
 
 });


 

 router.get('/getEvents', function (req, res) {     // GET API for getting exploring tutor
    let email = req.query.email;
    console.log(email)
    events.find({email:email},{_id :"" , text:"" , start:'' , end:''})

    
       .then(Tutor => {
          res.json(Tutor);
       }).catch(err => {
          res.status(500).send({
             message: err.message || "Some error occurred while retrieving notes."
          });
       });
 });

 module.exports = router;