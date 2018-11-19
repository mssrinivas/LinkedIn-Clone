var express = require('express');
var router = express.Router();
var utils = require('./../util/utils');
var {mongoose} = require('./../db/mongoose');
const multer = require('multer');
var app = express();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// var kafka = require('./../kafka/client');
var {JOBPOSTING} = require('./../models/jobpostings');

router.post('/postjob', function(req, res, next) {

    const JpbDetails=new JOBPOSTING({
        companyName : req.body.Company,
        Email : req.body.RecommendedMail,
        companyLogo : "",
        jobTitle : req.body.JobTitle,
        jobFunction : req.body.JobFunction,
        location : req.body.Location,
        numberofApplicants : 0,
        seniorityLevel : req.body.SeniorityLevel,
        description : req.body.JobDescription, 
        postingDate : "", 
        employmentType : req.body.EmploymentType, 
        industryType : req.body.Industry, 
        experience : req.body.Experience, 
        degree: req.body.Degree,
        budget : req.body.Budget, 
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
