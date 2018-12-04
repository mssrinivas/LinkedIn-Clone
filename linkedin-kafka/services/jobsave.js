// var mongo = require('./mongoose');

// function  handle_request(msg, callback){
//     var res = {};
//     console.log("In handle request:"+ JSON.stringify(msg));
//     const application = mongo.Applications({
//         Job_id: msg.jobid,
//         CompanyName: msg.companyName,
//         JobTitle: msg.jobTitle,
//         JobLocation: msg.jobLocation,
//         Applicant_id: msg.applicant_id,
//         Email: msg.email,
//         Applied: false,
//         Saved: true,
//         CompanyLogo: msg.companyLogo,
//         easyApply: msg.easyApply
//     });
//     application.save().then((item)=>{
//         console.log("\nApplication saved : ",item);
//         res.data="200"
//         res.value=item
//         console.log("\nResponse : " + JSON.stringify(res));
//         callback(null, res)
       
//     },(err)=>{
//         // res.code = "400";
//         // res.send("Bad request");
//         res.sendStatus(400).end();
//     });
// }
// exports.handle_request = handle_request;