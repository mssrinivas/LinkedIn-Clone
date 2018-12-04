var express = require('express');
var router = express.Router();
var {UserActivity} = require('../models/UserActivity');
var {Applications} = require('../models/application.js');
var {UserActivityIncomplete} = require('../models/UserActivityIncomplete');

  router.get('/getuserclicks', function(req, res) {
    console.log("Received Body ", req.query)
    UserActivity.find({recruiterName:req.query.mail}).then((app)=> {
     //   console.log("\n Number of Clicks for" + app + "\n");
      //  console.log(app.length);
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
    })
  });

  router.get('/savedjobs', function(req, res) {
    console.log("Received Body ", req.query)
    Applications.find({Saved:"true",RecruiterEmail:req.query.mail}).then((app)=> {
       // console.log("\nJobs are " + app + "\n");
       // console.log(app.length);
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
    })
  });


  router.get('/halffilled', function(req, res) {
    console.log("Received Body for HALF FILLED", req.query)
    UserActivityIncomplete.find({RecruiterEmail:req.query.mail}).then((app)=> {
        console.log("\n Number of HALFFILLED" + app + "\n");
        console.log(app.length);
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
    })
  });

  router.get('/fullfilled', function(req, res) {
    console.log("Received Body ", req.query)
    Applications.find({Applied:"true",RecruiterEmail:req.query.mail}).then((app)=> {
        console.log("\n Fully applied jobs" + app + "\n");
        console.log(app.length);
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
    })
  });

  module.exports = router;
