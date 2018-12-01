// // var mongo = require('./mongoose');
// var jobpostings = require('./../../linkedin-backend/db/jobpostings.js');


// function  handle_request(msg, callback){
//     var res = {};
//     console.log("\nIn kafka handle_request: "+ JSON.stringify(msg));
//     /*
//     mongo.jobpostings.find(msg).then((joblistings)=>{
//             res.code="200"
//             res.value=joblistings
//             console.log("\nResponse : " + JSON.stringify(joblistings));
//             console.log("\n------------sending callback  :")
//             console.log(callback)
//             callback(null, res)
//     })
//     */
//             // response.status(200).json({ joblistings });
//     // }).(err)=>{
//     //         console.log(err);
//     //         console.log("inside 400");
//     //         res.code = "400";
//     //         res.value = err;
//     //         res.sendStatus(400).end(); 

//     //         // response.status(201).json({ msg });
//     // });
        
//     const result = jobpostings.searchingJobs(null);
// }  
// exports.handle_request = handle_request;
    