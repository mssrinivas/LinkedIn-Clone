var express = require('express');
var router = express.Router();
var {mongoose} = require('./../db/mongoose');
var {Applications} = require('./../models/application');
var {JobPostings} = require('../models/jobpostings');

router.get("/myjobs",(request,response,next)=>{
    console.log("Inside Jobs search");
    console.log("<MAIL IS> ", request.query.mail)
    Applications.find({RecruiterEmail:request.query.mail}).then((joblistings)=>{
        console.log("Here", JSON.stringify(joblistings));
        response.status(200).json({ joblistings });
    }).catch((msg)=>{
        console.log(msg);
        response.status(201).json({ msg });
    });
});


router.get("/tenjobs",(request,response,next)=>{
    console.log("Inside Jobs search");
    console.log("<MAIL IS> ", request.query.mail)
    JobPostings.find({Email:request.query.mail}).limit(10).then((joblistings)=>{
        console.log("Here", JSON.stringify(joblistings));
        response.status(200).json({ joblistings });
    }).catch((msg)=>{
        console.log(msg);
        response.status(201).json({ msg });
    });
});

module.exports = router;
