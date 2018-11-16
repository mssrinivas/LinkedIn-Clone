var express = require('express');
var router = express.Router();
var utils = require('./../util/utils');
var mysql=require('./mysql.js');
var {mongoose} = require('./../db/mongoose');
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
const multer = require('multer');
var app = express();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var salt = bcrypt.genSaltSync(10);
// var kafka = require('./../kafka/client');
var {User} = require('./../models/user');


const storage=multer.diskStorage({
  destination :function(req,file, cb) {
    cb(null,'./public/uploads/');
  },
  filename: function(req,file,cb){
    console.log("Profile image file name: ",req.body);
    cb(null, req.body.email+".jpeg");
  }
});

const fileFilter =(req,file, cb) => {
  if(file.mimetype==='image/jpeg' || file.mimetype==='image/png' || file.mimetype==='image/jpg') {
    cb(null,true);
  }
  else {
    cb(null,false);
  }
}

const upload=multer({
    storage: storage,
    limits: {
      fileSize :1024*1024*5
    },
    fileFilter :fileFilter
  });


router.post('/uploadprofilepic' , upload.single('photos'), function(req , res , next) {
  console.log("Inside upload profile pic API");
  console.log(req.file);
  res.status(200).json({message : "profile photo uploaded successfully!"})
});
//==============================================================================================
router.post('/login', function(req, res, next) {
  console.log("inside login");
  let email=req.body.email;
  let password=req.body.password;
  console.log("Email entered", req.body.email);
  console.log("Password entered", req.body.password);
  const userDetails=new User({
    email: req.body.email,
    password: req.body.password
  });
  User.find({"email":req.body.email})
    .exec()
    .then(doc => {
      console.log("response got : ", doc);
      if(doc!=undefined && doc.length>0) {
            if(bcrypt.compareSync(password, doc[0].password)){
                const server_token = jwt.sign({uid:doc[0].email},utils.server_secret_key);
                console.log("UID from JWT: ", doc[0].email);
                res.status(200).json({
                    message : "User Logged in Successfully",
                    server_token: server_token,
                    current_user: doc[0].email
            });
          }
            else {
              console.log("Error.!!!!!!!")
                res.status(401).json({
                message : "Applicant entered wrong password"
              });
            }
      }
      else {
        console.log("Applicant is not registered, First Signup");
        res.status(400).json({
          message : "Applicant is not registered, First Signup"
        });
      }

    })
    .catch(err => {
      console.log("Error : ", err);
      res.status(500).json({
        message : "internal server error"
      });
    })
});

//==============================================================================================
router.post('/signup', function(req, res, next) {
  console.log("inside signup");
  console.log("req sent from signup page: ", req.body);
  let firstName=req.body.first_name;
  let lastName=req.body.last_name;
  let email=req.body.email;
  let password=req.body.password;
  var passwordToSave = bcrypt.hashSync(req.body.password, salt);
  const userDetails=new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: passwordToSave
  });
  User.find({"email":req.body.email})
    .exec()
    .then(doc=>{
        if(doc==undefined || doc.length==0) {
            userDetails.save().then(result=> {
                console.log("response obtained is : ", result);
                const server_token = jwt.sign({uid:result.email},utils.server_secret_key);
                console.log("UID from JWT: ", result.email);
                res.status(200).json({
                message : "Applicant Profile Created Successfully",
                server_token: server_token,
                current_user: result.email
              });
            })
            .catch(err => {
              console.log("error obtained is : ", err);
            })
        }
        else {
            res.status(400).json({
            message : "Applicant is already registered, please login"
            });
        }
    })
    .catch(err=> {
      console.log("error while checking if user is already signed in or not: ", err);
    })
});
//=======================================================================
// router.post('/updateProfile', function (req,res,next) {
// 	console.log("inside update profile");
//   var travelerDetails = {
//           firstName : req.body.firstName,
//           lastName : req.body.lastName,
//           aboutMe : req.body.aboutMe,
//           city : req.body.city,
//           company : req.body.company,
//           school : req.body.school,
//           hometown : req.body.hometown,
//           language : req.body.language,
//           gender : req.body.gender,
//           contactNumber : req.body.contactNumber,
//           profileImage : req.body.profileImage,
//           email : req.body.email,
//           country : "USA"
//   };
//   Traveler.updateOne({email : travelerDetails.email},{$set:{
//     first_name : travelerDetails.firstName,
//     last_name :travelerDetails.lastName,
//     contact_number :travelerDetails.contactNumber,
//     about_me :travelerDetails.aboutMe,
//     city :travelerDetails.city,
//     country :travelerDetails.country,
//     company :travelerDetails.company,
//     school :travelerDetails.school,
//     hometown :travelerDetails.hometown,
//     lang :travelerDetails.language,
//     gender :travelerDetails.gender
//   }})
//     .exec()
//     .then(doc=> {
//       console.log("Data Obtained after updation is : ", doc);
//       res.status(200).json({
//           message : "User profile updated"
//       });
//     })
//     .catch(err => {
//       console.log("error while updating user", err);
//       res.status(400).json({
//           message : "User profile could not be updated"
//       });
//     })
// });
//
// //==============================================================================================
// router.post('/getProfile', function (req,res,next) {
//   console.log("inside get profile post");
//   let email=req.body.email;
//   Traveler.find({"email": email})
//     .exec()
//     .then(doc => {
//       console.log("response got : ", doc[0]);
//         res.status(200).json({
//               message : "User profile fetched successfully",
//               userDetails: doc
//             });
//       })
//     .catch(err => {
//       console.log("Error : ", err);
//       res.status(400).json({
//               message : "User profile can not be fetched successfully"
//             });
//     })
//
// });
// //==============================================================================================
// router.post('/ownerlogin', function(req, res, next) {
//   console.log("inside owner login");
//   let email=req.body.username;
//   let password=req.body.password;
//   console.log("Email entered", email);
//   const userDetails=new Owner({
//     email: req.body.username,
//     pwd: req.body.password
//   });
//   Owner.find({"email":req.body.username})
//     .exec()
//     .then(doc => {
//       console.log("response got : ", doc);
//       if(doc!=undefined && doc.length>0) {
//             if(bcrypt.compareSync(password, doc[0].pwd)){
//                 const server_token = jwt.sign({uid:doc[0].email},utils.server_secret_key);
//                 res.status(200).json({
//                     message : "Owner can login",
//                     servertoken: server_token,
//                     loginUser: doc[0].email
//             });
//           }
//             else {
//                 res.status(400).json({
//                 message : "Owner entered wrong password"
//               });
//             }
//       }
//       else {
//         res.status(400).json({
//           message : "Owner is not registered to login"
//         });
//       }
//
//     })
//     .catch(err => {
//       console.log("Error : ", err);
//     })
// });
// //==============================================================================================
// router.post('/ownersignup', function(req, res, next) {
//   console.log("inside owner signup");
//   let firstName=req.body.firstName;
//   let lastName=req.body.lastName;
//   let email=req.body.username;
//   let password=req.body.password;
//   var passwordToSave = bcrypt.hashSync(req.body.password, salt);
//   const userDetails=new Owner({
//     first_name: req.body.firstName,
//     last_name: req.body.lastName,
//     email: req.body.username,
//     pwd: passwordToSave
//   });
//   Owner.find({"email":req.body.username})
//     .exec()
//     .then(doc=>{
//         if(doc==undefined || doc.length==0) {
//             userDetails.save().then(result=> {
//                 console.log("response obtained is : ", result);
//                 res.status(200).json({
//                 message : "Handling owner singup POST request",
//                 createdUser: userDetails
//               });
//             })
//             .catch(err => {
//               console.log("error obtained is : ", err);
//             })
//         }
//         else {
//             res.status(400).json({
//             message : "Owner is already registered, please login"
//             });
//         }
//     })
//     .catch(err=> {
//       console.log("error while checking if owner is already signed in or not: ", err);
//     })
// });
//==============================================================================================
module.exports = router;
