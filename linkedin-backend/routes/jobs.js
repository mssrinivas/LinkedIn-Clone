var express = require('express');
var router = express.Router();
var {jobpostings} = require('./../models/jobposting.js');
var {mongoose} = require('../db/mongoose');
var jobpostings = require('../db/jobpostings.js');

router.get("/search",(request,response,next)=>{
    console.log("Inside Jobs search");
    jobpostings.searchJobs(null).then((joblistings)=>{
        
        response.status(200).json({ joblistings });

    }).catch((msg)=>{
        console.log(msg);
        response.status(201).json({ msg });
    });
});


router.post("/save/:jobid",(request,response,next)=>{
    console.log("Inside save job");
    const jobid = request.params.jobid;
    const newDocument = new jobpostings({
        companyName :"",
        Email :"",
        companyLogo :"",
        jobTitle :"",
        jobFunction :"",
        location :"",
    });

});

module.exports = router;