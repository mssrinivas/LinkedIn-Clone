var express = require('express');
var router = express.Router();
var {UserActivity} = require('../models/UserActivity');
var {Applications} = require('../models/application.js');

  router.get('/getuserclicks', function(req, res) {
    console.log("Received Body ", req.body)
    UserActivity.find({recruiterName:"Srinivas"}).then((app)=> { 
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
    console.log("Received Body ", req.body)
    Applications.find({Saved:"false"}).then((app)=> { 
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
    console.log("Received Body ", req.body)
    Applications.find({recruiterName:"Srinivas"}).then((app)=> { 
        console.log("\n Number of Clicks for" + app + "\n");
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
    console.log("Received Body ", req.body)
    Applications.find({Applied:"true"}).then((app)=> { 
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
