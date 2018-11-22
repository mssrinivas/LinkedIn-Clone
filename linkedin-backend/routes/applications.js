var express = require('express');
var router = express.Router();
var {Applications} = require('./../models/application');

//apply custom job

// router.post('/job', function(req, res, next) {
//     console.log("inside custom apply");
//     console.log("req sent from custom apply", req.body);
//     const customApplyDetail = new Applications({
//         HowDidYouHear: req.body.hear,
//         Email : req.body.email,
//         resume: req.body.resume,
//         First_name: req.body.firstname,
//         Last_name: req.body.lastname,
//         Address : req.body.address,
//         Phone : req.body.contact,
//         Gender : req.body.gender,
//         Race : req.body.race,
//         Veteran : req.body.veteran,
//         Disability : req.body.disability,
//         CompanyName : req.body.company,
//         JobTitle : req.body.jobtitle,
//         JobLocation : req.body.joblocation,
//         Applied : true,
//         Saved : false,
//         CompanyLogo : req.body.companyLogo,
//         Job_id : req.body.id,
//         easyApply : req.body.easyApply
//     });
//     customApplyDetail.save().then((result)=> {
//         console.log("apply successful : ",result);
//                          // res.sendStatus(200).end();
//                          res.writeHead(200,{
//                              'Content-Type' : 'application/json'
//                          });
//                          res.end(JSON.stringify("Applied successfully"));
//     },(err)=>{
//         console.log("Error While applying custom job");
//     })
                  
//   });
router.post('/job', function(req, res, next) {
    console.log("inside custom apply");
    console.log("req sent from custom apply", req.body);
    Applications.findOne({Applicant_id:"5bf26ceacb627fb4927fbd99", Job_id:"5bf2356f7adf109c6dbcb244", Saved:true, Applied:false},function(err, doc) {
        if(err){res.status(400).send("error occured")}
        else{
            if(doc){
                console.log("\n..found saved application....\n");
                Applications.update(
                    {Applicant_id:"5bf26ceacb627fb4927fbd99", Job_id:"5bf2356f7adf109c6dbcb244", Saved:true, Applied:false}, 
                    {$set : 
                         {
                            HowDidYouHear: req.body.hear,
                            Email : req.body.email,
                            resume: req.body.resume,
                            First_name: req.body.firstname,
                            Last_name: req.body.lastname,
                            Address : req.body.address,
                            Phone : req.body.contact,
                            Gender : req.body.gender,
                            Race : req.body.race,
                            Veteran : req.body.veteran,
                            Disability : req.body.disability,
                            Applied : true,
                            Saved : false,
                         }
                     })
                    .exec()
                    .then(item => {
                        console.log("application after update : ", item);
                        res.writeHead(200,{
                            'Content-Type' : 'application/json'
                        });
                        res.end(JSON.stringify("Applied successfully"));
                    })
                    .catch(err => {
                        console.log("error while updating saved application", err);
                        // res.status(400).json({
                        //     message : "User profile could not be updated"
                        // });
                    })
            }
            else{
                const customApplyDetail = new Applications({
                    Applicant_id : req.body.Applicant_id,
                    HowDidYouHear: req.body.hear,
                    Email : req.body.email,
                    resume: req.body.resume,
                    First_name: req.body.firstname,
                    Last_name: req.body.lastname,
                    Address : req.body.address,
                    Phone : req.body.contact,
                    Gender : req.body.gender,
                    Race : req.body.race,
                    Veteran : req.body.veteran,
                    Disability : req.body.disability,
                    CompanyName : req.body.company,
                    JobTitle : req.body.jobtitle,
                    JobLocation : req.body.joblocation,
                    Applied : true,
                    Saved : false,
                    CompanyLogo : req.body.companyLogo,
                    Job_id : req.body.id,
                    easyApply : req.body.easyApply
                });
                customApplyDetail.save().then((result)=> {
                    console.log("apply successful : ",result);
                                     // res.sendStatus(200).end();
                                     res.writeHead(200,{
                                         'Content-Type' : 'application/json'
                                     });
                                     res.end(JSON.stringify("Applied successfully"));
                },(err)=>{
                    console.log("Error While applying custom job");
                })
            }
        }
    })
    
                  
  });
  //applied jobs in dashboard

  router.get('/applied', function(req, res, next) {
    console.log("inside appled jobs");
    console.log("req sent from applied job dashboard", req.body);
    
    Applications.find({Email:"saypatil12345@gmail.com", Applied:true, Saved:false}).then((app)=> { 
        console.log("\nNumber of applied jobs: " + app.length + "\n");
        console.log("Applied jobs : "+ app );
        res.writeHead(200,{
            'Content-Type' : 'application/json'
        })
        res.end(JSON.stringify(app));
    }, (err) => {
        console.log("error : " + err)
        console.log("inside 400");
        res.writeHead(400,{
            'Content-Type' : 'text/plain'
        })
       res.end("Invalid details");
    }
                  
  );
});

//Saved jobs in dashboard

router.get('/saved', function(req, res, next) {
    console.log("inside saved jobs");
    console.log("req sent from saved job dashboard", req.body);
    
    Applications.find({Email:"recruiter@yahoo.com", Saved:true, Applied:false}).then((app)=> { 
        console.log("\nNumber of saved jobs: " + app.length + "\n");
        console.log("Saved jobs : "+ app );
        res.writeHead(200,{
            'Content-Type' : 'application/json'
        })
        res.end(JSON.stringify(app));
    }, (err) => {
        console.log("error : " + err)
        console.log("inside 400");
        res.writeHead(400,{
            'Content-Type' : 'text/plain'
        })
       res.end("Invalid details");
    }
                  
  );
});

  module.exports = router;