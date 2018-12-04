var express = require('express');
var router = express.Router();
var {UserActivityIncomplete} = require('../models/UserActivityIncomplete');

router.post('/halffilled', function(req, res) {
    console.log("Received Body ", req.body)
     var UserActivityDetails = new UserActivityIncomplete({
         RecruiterEmail : req.body.RecruiterEmail,
         JobTitle : req.body.JobTitle,
    });
    console.log("----------")
    console.log("NEW JSON: ", UserActivityDetails)
    UserActivityDetails.save().then((result)=> {
        console.log("Database write : ",result);
                         res.writeHead(200,{
                             'Content-Type' : 'application/json'
                         });
                         res.end(JSON.stringify("Tracked Successfully"));
    },(err)=>{
        console.log(err)
        console.log("Error While tracking activity");
        res.writeHead(400,{
            'Content-Type' : 'application/json'
        });
        res.end(JSON.stringify("Failure"));
    })
  });

  module.exports = router;
