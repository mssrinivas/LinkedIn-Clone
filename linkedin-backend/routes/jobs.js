var express = require('express');
var router = express.Router();
var {Applications} = require('./../models/application.js');
var {mongoose} = require('../db/mongoose');
var jobpostings = require('../db/jobpostings.js');
var kafka = require('./../kafka/client.js');
// job listing without kafka

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

//job listing with kafka
router.get("/search",function(request,response,next){
    console.log("Inside Jobs search");
    kafka.make_request('job_listing',null, function(err,results){
        console.log('---- kafka  result of job listing----');
            console.log("\nResults  :" + JSON.stringify(results));
            if (err){
                console.log("Inside err");
                console.log(results.value);
                response.status(201).json({ "msg" : results.value });
               
            }else{  
                //const{value} = results;
                console.log("\nApplication to be saved : ",results.value);
                // res.writeHead(200,{
                //     'Content-Type' : 'application/json'
                // });
                response.end(JSON.stringify(results.value));
                response.status(200).json({ "joblistings":results.value});
         }
    });
});
    // jobpostings.searchJobs(null).then((joblistings)=>{
    //     console.log(joblistings);
        

    // }).catch((msg)=>{
    //     console.log(msg);
    //     response.status(201).json({ msg });
    // });

// router.post("/save/:jobid", async (request, response, next) => {
//     try {
//         console.log("inside jobs save");
//         const jobid = request.params.jobid;
//         const { companyName, jobTitle, jobLocation, applicant_id, email, companyLogo, easyApply } = request.body;
//         console.log(request.body);
//         const application = new Applications({
//             Job_id: jobid,
//             CompanyName: companyName,
//             JobTitle: jobTitle,
//             JobLocation: jobLocation,
//             Applicant_id: applicant_id,
//             Email: email,
//             Applied: false,
//             Saved: true,
//             CompanyLogo: companyLogo,
//             easyApply: easyApply
//         });
        
//         const savedApplication = await application.save();
//         console.log(savedApplication);
//         response.sendStatus(200);
//     } catch (error) {
//         console.log(error);
//         response.sendStatus(201);
//     }
// });
router.post("/save/:jobid", function(req, res, next){
    
        console.log("inside jobs save");
        const jobid = req.params.jobid;
        console.log("jobid ",jobid );
        const { companyName, jobTitle, jobLocation, applicant_id, email, companyLogo, easyApply } = req.body;
        // console.log(request.body);
        let reqBody = Object.assign({},req.body, {jobid})  
        console.log("reqBosy jobid" + reqBody.jobid)
        console.log("printing reqBody")
        console.log(reqBody); 
        kafka.make_request('job_save',reqBody, function(err,results){
            console.log('---- kafka  result of saving job----');
            console.log("\nResults  :" + JSON.stringify(results));
            if (err){
                console.log("Inside err");
                res.json({
                    status:"error",
                    msg:"System Error, Try Again."
                })
            }else{  
                console.log("\nApplication to be saved : ",results.value);
                res.writeHead(200,{
                    'Content-Type' : 'application/json'
                });
                res.end(JSON.stringify(results.value));
         }
        })     
        
    // } catch (error) {
    //     console.log(error);
    //     response.sendStatus(201);
    // }
});



module.exports = router;