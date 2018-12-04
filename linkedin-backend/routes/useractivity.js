// var express = require('express');
// var router = express.Router();
// var {UserActivity} = require('../models/UserActivity');

// router.post('/halffilled', function(req, res) {
//     console.log("Received Body ", req.body)
//      var UserActivityDetails = new UserActivity({
//          Company : req.body.Company,
//          Title : req.body.JobTitle,
//          recruiterName :req.body.recruiterName
//     });
//     console.log("----------")
//     console.log("NEW JSON: ", UserActivityDetails)
//     UserActivityDetails.save().then((result)=> {
//         console.log("Database write : ",result);
//                          res.writeHead(200,{
//                              'Content-Type' : 'application/json'
//                          });
//                          res.end(JSON.stringify("Tracked Successfully"));
//     },(err)=>{
//         console.log(err)
//         console.log("Error While tracking activity");
//         res.writeHead(400,{
//             'Content-Type' : 'application/json'
//         });
//         res.end(JSON.stringify("Failure"));
//     })
//   });

  
//   module.exports = router;