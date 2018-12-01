// var mongo = require('./mongoose');


// function  handle_request(msg, callback){
//     var res = {};
//     console.log("\nIn kafka handle_request: "+ JSON.stringify(msg));
//     mongo.Applications.find(
//         {Applicant_id:msg, Applied:true, Saved:false},
//         function(err, application){
//             if(err){
//                 console.log("inside 400");
//                 res.code = "400";
//                 res.value = "No booked properties";
//                 res.sendStatus(400).end(); 
//             }else{
//                 console.log("\nTotal Applied applications :  " + application.length);
//                  res.code= "200";
//                  res.value = application;
//                  console.log("\nRes in handle_request : " + res);
//                  callback(null, res);
//             }
//         }
//     )
//     }  
//     exports.handle_request = handle_request;
    