var express = require('express');
var router = express.Router();
var {Applications} = require('./../models/application.js');
var {mongoose} = require('../db/mongoose');
var jobpostings = require('../db/jobpostings.js');

router.get("/search",(request,response,next)=>{
    console.log("Inside Jobs search");
    jobpostings.searchJobs(null).then((joblistings)=>{
        console.log(joblistings);
        response.status(200).json({ joblistings });

    }).catch((msg)=>{
        console.log(msg);
        response.status(201).json({ msg });
    });
});


router.post("/save/:jobid", async (request, response, next) => {
    try {
        console.log("inside jobs save");
        const jobid = request.params.jobid;
        const { companyName, jobTitle, jobLocation, applicant_id, email, companyLogo, easyApply } = request.body;
        console.log(request.body);
        const application = new Applications({
            Job_id: jobid,
            CompanyName: companyName,
            JobTitle: jobTitle,
            JobLocation: jobLocation,
            Applicant_id: applicant_id,
            Email: email,
            Applied: false,
            Saved: true,
            CompanyLogo: companyLogo,
            easyApply: easyApply
        });
        
        const savedApplication = await application.save();
        console.log(savedApplication);
        response.sendStatus(200);
    } catch (error) {
        console.log(error);
        response.sendStatus(201);
    }
});



module.exports = router;