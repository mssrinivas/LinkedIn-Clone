var express = require('express');
var router = express.Router();

var {JobPostings} = require('../models/jobpostings');

router.post('/postjob', function(req, res) {
    console.log("Received Body ", req.body)
     var JobDetails = new JobPostings({
        CompanyName : req.body.Company,
        Email : req.body.RecommendedMail,
        CompanyLogo : "https://img.icons8.com/color/200/5e6d77/yahoo.png",
        JobTitle : req.body.JobTitle,
        jobFunction : req.body.JobFunction,
        JobLocation : req.body.Location,
        numberofApplicants : 0,
        easyApply : req.body.EasyApply,
        seniorityLevel : req.body.SeniorityLevel,
        description : req.body.JobDescription,
        postingDate : new Date(),
        employmentType : req.body.EmploymentType, 
        industryType : req.body.Industry,
        experience : req.body.Experience,
        degree: req.body.Degree,
        budget : req.body.Budget,
        recruiterName : req.body.RecruiterName,
        State : req.body.state,
        ZipCode : req.body.ZipCode
        // CompanyName : "Yahoo",
        // Email : "srinivas@yahoo.com",
        // CompanyLogo : "https://img.icons8.com/color/200/5e6d77/yahoo.png",
        // JobTitle : "Analyst",
        // jobFunction : "Analyst",
        // JobLocation : "San Jose",
        // numberofApplicants : 0,
        // easyApply : 1,
        // seniorityLevel : "Manager",
        // description : "No Description",
        // postingDate : new Date(),
        // employmentType : "Internship", 
        // industryType : "Electronics",
        // experience : 4,
        // degree: "Ph.D",
        // budget : 120,
        // recruiterName : "Srinivas"
    });
    console.log("----------")
    console.log("NEW JSON: ", JobDetails)
    JobDetails.save().then((result)=> {
        console.log("apply successful : ",result);
                         res.writeHead(200,{
                             'Content-Type' : 'application/json'
                         });
                         res.end(JSON.stringify("Applied successfully"));
    },(err)=>{
        console.log(err)
        console.log("Error While applying custom job");
        res.writeHead(400,{
            'Content-Type' : 'application/json'
        });
        res.end(JSON.stringify("Failure"));
    })
  });

  module.exports = router;
