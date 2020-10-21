const express = require('express');
var cors = require('cors')
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Tutor = require('../models/tutor.model');
const User = require('../models/user.model');
const config = require('../config.json');
const tokenChecker = require("../tokenChecker");

router.post('/login',function (req, res) {   // Post API for Login Tutor Account
    Tutor.findOne({
          email: req.body.email
       })
       .exec()
       .then(function (user) {
           console.log("test" +  user)
          if(user){
              bcrypt.compare(req.body.password, user.password, function (err, result) {
             if (err) {
                return res.status(401).json({
                   failed: 'Unauthorized Access'
                });
             }
             if (result) {
                const JWTToken = jwt.sign({
                      email: user.email,
                      _id: user._id
                   },
                   config.secret, {
                     expiresIn: 86400 // expires in 24 hours
                   });
                return res.status(200).json({
                   name: user.name,
                   email: user.email,
                   token: JWTToken,
                   accountType: user.accountType,
                   expertise : user.expertise
                });
             }
            
             return res.status(401).json({
                failed: 'Unauthorized Access'
             });
          });
          }
          else
          {
           return res.status(401).json({
                   failed: 'Email or password incorrect ! Please try again..'
                });  
          }
         
       })
       .catch(error => {
          res.status(500).json({
             error: error
          });
       });;
 });
 
router.post('/signup', function (req, res) {    // POST Signup API for Turor Signup

   if (!req.body.password) {
      return res.json({
         message: "password can't be empty"
      })
   }

   Tutor.find({
      email: req.body.email
   }, function (err, docs) {
      if (err) {
         return res.status(400).json({
            error: err
         });
      } else {
         console.log("check user", docs.length);
         if (docs.length == 1) {
            return res.status(422).json({
               message: "Tutor Already Exist"
            });
         } else {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
               if (err) {
                  return res.status(500).json({
                     error: err
                  });
               } else {
                  const tutor = new Tutor({
                     _id: new mongoose.Types.ObjectId(),
                     name: req.body.name,
                     phone: req.body.phone,
                     address: req.body.address,
                     email: req.body.email,
                     password: hash,
                     expertise:req.body.expertise,
                     accountType: "Tutor",
                     statusActive:0    // for start tutor status will be false, after passing the test we'll update the status as true

                  });
                  console.log("tutor",tutor);
                  tutor.save().then(function (result) {
                     console.log(result);
                     res.status(200).json({
                        success: 'New tutor account has been created'
                     });
                  }).catch(error => {
                     res.status(500).json({
                        error: error
                     });
                  });
               }
            });
         }
      }

   });


});


function  studentExploreTokenValidation (req, res, next)
{
   const token = req.body.token || req.query.token || req.headers['token'];
  // let parseToken = token.split(" ");
  var decoded = jwt.decode(token, config.secret);
  User.findOne({
   email: decoded
})
.exec()
.then(function (user) {
   if(user)
   {
      next();
   }

});
}


router.post('/updateTutorStatus', function (req, res) {     // GET API for getting exploring tutor 

   let email = req.query.email;

   let status = req.query.status;
   Tutor.update({email:email}, {statusActive:status})
      .then(Tutor => {
         console.log(Tutor)
         res.json(Tutor);
      }).catch(err => {
         res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
         });
      });
});


router.get('/exploreTutor', function (req, res) {     // GET API for getting exploring tutor

   Tutor.find({statusActive:true},{name :"" , expertise:"" , email:'' , phone:'' , address:'' , createdAt:''})
      .then(Tutor => {
         res.json(Tutor);
      }).catch(err => {
         res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
         });
      });
});



router.get('/PassTutors', function (req, res) {     // GET API for getting exploring tutor
   let email = req.query.email;

   Tutor.find({email:email})
      .then(Tutor => {
         res.json(Tutor);
      }).catch(err => {
         res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
         });
      });
});




module.exports = router;