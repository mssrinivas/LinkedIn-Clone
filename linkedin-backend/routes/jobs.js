var express = require('express');
var router = express.Router();
var {Applications} = require('./../models/application.js');
var {jobpostings} = require('./../models/jobposting.js');
var {User} = require('./../models/user.js');
var {mongoose} = require('../db/mongoose');
var jobpostings_db = require('../db/jobpostings.js');
var kafka = require('./../kafka/client.js');
const multer = require('multer');
var fs = require('fs');
// job listing without kafka


const storage=multer.diskStorage({
    destination :function(req,file, cb) {
        console.log("in destination")
        console.log(req.body);
        const savejob = JSON.parse(req.body.savejob);

        var dir = './public/resumeFolder/'+savejob.Applicant_id;
        console.log(dir);
        console.log(fs.existsSync(dir));
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null,dir);
    },

    filename: function(req, file, cb) {

      console.log("in filename");
      console.log(req.body);
      const savejob = JSON.parse(req.body.savejob);

      const fields = savejob.resume.split("/");
      const applicantId = savejob.Applicant_id
      var filename=fields.pop();
      cb(null, filename);
    }
  });

var upload = multer({ storage: storage }).any();

router.get("/search",(request,response,next)=>{
    console.log("Inside Jobs search");
    jobpostings_db.searchJobs(null).then((joblistings)=>{
        console.log(joblistings);
        response.status(200).json({ joblistings });

    }).catch((msg)=>{
        console.log(msg);
        response.status(201).json({ msg });
    });
});

//job listing with kafka
// router.get("/search",function(request,response,next){
//     console.log("Inside Jobs search");
//     kafka.make_request('job_listing',null, function(err,results){
//         console.log('---- kafka  result of job listing----');
//             console.log("\nResults  :" + JSON.stringify(results));
//             if (err){
//                 console.log("Inside err");
//                 console.log(results.value);
//                 response.status(201).json({ "msg" : results.value });
               
//             }else{  
//                 //const{value} = results;
//                 console.log("\nApplication to be saved : ",results.value);
//                 // res.writeHead(200,{
//                 //     'Content-Type' : 'application/json'
//                 // });
//                 response.end(JSON.stringify(results.value));
//                 response.status(200).json({ "joblistings":results.value});
//          }
//     });
// });
    // jobpostings.searchJobs(null).then((joblistings)=>{
    //     console.log(joblistings);
        

    // }).catch((msg)=>{
    //     console.log(msg);
    //     response.status(201).json({ msg });
    // });

router.post("/save/:jobid", async (request, response, next) => {
    try {
        console.log("inside jobs save");
        const jobid = request.params.jobid;
        const { companyName, jobTitle, jobLocation, applicant_id, RecruiterEmail,Email, companyLogo, easyApply } = request.body;
        console.log(request.body);
        const application = new Applications({
            Job_id: jobid,
            CompanyName: companyName,
            JobTitle: jobTitle,
            JobLocation: jobLocation,
            Applicant_id: applicant_id,
            RecruiterEmail: RecruiterEmail,
            Email : Email,
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
// router.post("/save/:jobid", function(req, res, next){
    
//         console.log("inside jobs save");
//         const jobid = req.params.jobid;
//         console.log("jobid ",jobid );
//         const { companyName, jobTitle, jobLocation, applicant_id, email, companyLogo, easyApply } = req.body;
//         // console.log(request.body);
//         let reqBody = Object.assign({},req.body, {jobid})  
//         console.log("reqBosy jobid" + reqBody.jobid)
//         console.log("printing reqBody")
//         console.log(reqBody); 
//         kafka.make_request('job_save',reqBody, function(err,results){
//             console.log('---- kafka  result of saving job----');
//             console.log("\nResults  :" + JSON.stringify(results));
//             if (err){
//                 console.log("Inside err");
//                 res.json({
//                     status:"error",
//                     msg:"System Error, Try Again."
//                 })
//             }else{  
//                 console.log("\nApplication to be saved : ",results.value);
//                 res.writeHead(200,{
//                     'Content-Type' : 'application/json'
//                 });
//                 res.end(JSON.stringify(results.value));
//          }
//         })     
        
    // } catch (error) {
    //     console.log(error);
    //     response.sendStatus(201);
    // }
// });

router.post("/easyapply/:jobid", async (request,response)=>{
    var jobid = request.params.jobid;
    var data = request.body;
    console.log("job id:"+jobid);
    console.log("data :"+JSON.stringify(data));
    
    
    const easyApplyApplication = new Applications({
        Job_id :jobid,
        CompanyName : data.CompanyName,
        JobTitle : data.JobTitle,
        JobLocation : data.JobLocation,
        Applicant_id : data.Applicant_id,
        Email :data.Email,
        RecruiterEmail : data.RecruiterEmail,
        Applied :true,
        Saved : false,
        easyApply : true,
        First_name : data.First_name,
        Last_name : data.Last_name,
        resume : data.resume

    });
    
    try{
        let saveApplication = await easyApplyApplication.save()
        let incrementApplicants = await jobpostings.findOneAndUpdate({"_id":jobid},{$inc:{ "numberofApplicants":1}});
        let addToAppliedJobArray = await User.findByIdAndUpdate({"_id":data.Applicant_id},{ $addToSet:{applied_job:jobid}});
    }catch(err){
        console.log(err);
        response.status(201);
    }
    
    console.log("saved");
    response.sendStatus(200);

    /*
    Job_id :{type : String, required : true},
    CompanyName :{type : String, required : true},
    JobTitle : {type : String, required : true},
    JobLocation : {type : String, required : true},
    Applicant_id :{type : String, required : true},
    Email :{type : String, required: true},
    RecruiterEmail : {type : String, required: true},
    Applied :{type : Boolean, default : false, required : true},
    Saved :{type : Boolean, default : false, required : true},
    easyApply : {type : Boolean, default : false, required : true},
    */
   
});

router.post("/easyapplywithfile/:jobid",(request,response)=>{
    var jobid = request.params.jobid;
    console.log("in request");
    console.log(jobid);
    console.log(request.body);
    upload(request,response,(err)=>{
        if(err){
            response.sendStatus(201);
        }else{
            console.log("after upload");
            const savedjob = JSON.parse(request.body.savejob);
            console.log(savedjob);

            const easyApplyApplication = new Applications({
                Job_id :jobid,
                CompanyName : savedjob.CompanyName,
                JobTitle : savedjob.JobTitle,
                JobLocation : savedjob.JobLocation,
                Applicant_id : savedjob.Applicant_id,
                Email :savedjob.Email,
                RecruiterEmail : savedjob.RecruiterEmail,
                Applied :true,
                Saved : false,
                easyApply : true,
                First_name : savedjob.First_name,
                Last_name : savedjob.Last_name,
                resume : savedjob.resume
        
            });

            
            easyApplyApplication.save((err,jobapplied)=>{
                if(err){ 
                    console.log(err);
                    response.sendStatus(201); 
                }
                else{ 
                    console.log("in success of easy apply with file")
                    jobpostings.findOneAndUpdate({"_id":jobid},{$inc:{ "numberofApplicants":1}},(err,success)=>{
                        if(err){ 
                            console.log(err); 
                            response.sendStatus(201);
                        }
                        else{
                            console.log("in success");
                            User.findByIdAndUpdate({"_id":savedjob.Applicant_id},{ $addToSet:{applied_job:jobid} },(err,success)=>{
                                if(err){
                                    console.log(err);
                                    response.sendStatus(201);
                                }else{
                                    console.log("in success of applied job array user");
                                    response.sendStatus(200);
                                }
                            })
                            
                        }
                    });
                    ;
                 }
            });
        }
    })
});



module.exports = router;