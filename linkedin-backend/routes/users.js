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
var kafka = require('./../kafka/client.js');
var {User} = require('./../models/user');

const redis = require('redis');
let client = redis.createClient(6379,'127.0.0.1');
client.on('connect', function(){
  console.log('connected to redis');
})
const userresult = "";
console.time("Query_Time");

const storage=multer.diskStorage({
  destination :function(req,file, cb) {
    cb(null,'./public/uploads/');
  },
  filename: function(req,file,cb){
    console.log("Profile image file name: ",req.body);
    cb(null, req.body.applicant_id+".jpeg");
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
                    current_user: doc[0].email,
                    user_Details : doc[0]
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
  var recruiter_flag = req.body.recruiter_value == "Recruiter" ? 1 : 0;
  var passwordToSave = bcrypt.hashSync(req.body.password, salt);
  const userDetails=new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: passwordToSave,
    recruiter_flag : recruiter_flag
  });
  User.find({"email":req.body.email})
    .exec()
    .then(doc=>{
        if(doc==undefined || doc.length==0) {
            userDetails.save().then(result=> {
                console.log("response obtained is : ", result);
                const server_token = jwt.sign({uid:result.email},utils.server_secret_key);
                console.log("UID from JWT: ", result.email);
                User.updateOne({_id : result._id},{$set:{
                    applicant_id : result._id
                  }})
                  .then( res => {
                      console.log("Applicant ID: " , res);
                  })
                  .catch(errors => {
                     console.log("error while updating applicant id", errors);
                  })
                res.status(200).json({
                message : "Applicant Profile Created Successfully",
                server_token: server_token,
                applicant_id: result._id,
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
router.post('/updateProfile', function (req,res,next) {
	console.log("inside update profile");
  var userDetails = {
          firstName : req.body.firstName,
          lastName : req.body.lastName,
          address : req.body.address,
          state : req.body.state,
          city : req.body.city,
          zipCode : req.body.zipCode,
          experience : req.body.experience,
          education : req.body.education,
          school : req.body.school,
          skills : req.body.skills,
          profileSummary : req.body.profileSummary,
          email : req.body.current_user,
          applicant_id : req.body.applicant_id,
          profile_img : req.body.profile_img
  };
  User.updateOne({applicant_id : userDetails.applicant_id},{$set:{
    first_name : userDetails.firstName,
    last_name :userDetails.lastName,
    email : userDetails.email,
    address :userDetails.address,
    state :userDetails.state,
    city :userDetails.city,
    zip_code :userDetails.zipCode,
    experience :userDetails.experience,
    education :userDetails.education,
    skills :userDetails.skills,
    profile_summary :userDetails.profileSummary,
    profile_img :userDetails.profile_img
  }})
    .exec()
    .then(doc=> {
      console.log("Data Obtained after updation is : ", doc);
      res.status(200).json({
          message : "User profile updated"
      });
    })
    .catch(err => {
      console.log("error while updating user", err);
      res.status(400).json({
          message : "User profile could not be updated"
      });
    })
});

// //==============================================================================================
router.post('/getProfile', function (req,res,next) {
  console.log("inside get profile post",req.body.applicant_id);
  User.find({"applicant_id": req.body.applicant_id})
    .exec()
    .then(doc => {
      console.log("response got : ", doc[0]);
        res.status(200).json({
              message : "User profile fetched successfully",
              userDetails: doc
            });
      })
    .catch(err => {
      console.log("Error : ", err);
      res.status(400).json({
              message : "User profile can not be fetched successfully"
            });
    })

});
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

// router.post("/users", function(req, res, next) {
//   console.time("Query_Time");
//   var result = [];
//   console.log("Inside Search Post Request");
//   client.get(userresult,function(err,value){
//     if(err) {
//       return console.log(err);
//     }
//     if(value) {
//       console.log("Type of value :", typeof(value));
//       result = JSON.parse(value);
//       client.expire(userresult,5);
//       res.status(200).json({result});
//       return console.timeEnd("Query_Time");
//     }
//     else {
//       User.find({"first_name" : req.body.first_name})
//         .then(response => {
//           console.log("Response from find users", response);
//           client.set(userresult,JSON.stringify(response),function(err){
//             if(err) {
//               return console.error(err);
//             }
//           })
//           result = response;
//           res.status(200).json({result});
//           return console.timeEnd("Query_Time");

//         })
//         .catch(err => {
//           console.log("Error : ", err.response);
//           res.status(500).json({
//             message: "internal server error"
//           });
//         });
//     }
//   });
// });
router.post("/users", function(req, res, next) {
  console.time("Query_Time");
  var result = [];
  console.log("Inside Search Post Request");
  client.get(userresult,function(err,value){
    if(err) {
      return console.log(err);
    }
    if(value) {
      console.log("Type of value :", typeof(value));
      result = JSON.parse(value);
      client.expire(userresult,1);
      res.status(200).json({result});
      return console.timeEnd("Query_Time");
    }
    else {
      kafka.make_request('search',req.body, function(err,results){
        console.log('\n---- kafka  result of people search----');
        console.log("results  :" + results);
        if (err){
            console.log("Inside err", err);
            res.status(500).json({
              message: "internal server error"
            });
        }else{  
            console.log("\nkafka results value : ",results.value);
            res.writeHead(200,{
                        'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify(results.value));
            // res.status(200).json({results.value});
            return console.timeEnd("Query_Time");
        }
    })
  }
});
});
     
       
  

module.exports = router;
