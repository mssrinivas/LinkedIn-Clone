var express = require('express');
var router = express.Router();
var {JobPostings} = require('./../models/jobpostings');

router.post('/postjob', function(req, res) {
    console.log("Received Body ", req.body)
     const JobDetails = new JobPostings({
        companyName : req.body.Company,
        Email : req.body.RecommendedMail,
        companyLogo : "https://img.icons8.com/color/200/5e6d77/yahoo.png",
        jobTitle : req.body.JobTitle,
        jobFunction : req.body.JobFunction,
        location : req.body.Location,
        numberofApplicants : 0,
        easyApply : req.body.EasyApply,
        seniorityLevel : req.body.SeniorityLevel,
        description : req.body.JobDescription,
        postingDate : new Date(),
        employmentType : req.body.EmploymentType, 
        industryType : req.body.Industry,
        experience : req.body.Experience,
        degree: req.body.Degree,
        budget : 120,
        recruiterName : "Srinivas"
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
