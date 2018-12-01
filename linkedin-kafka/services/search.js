// var mongo = require('./mongoose');
// const redis = require('redis');
// let client = redis.createClient(6379,'127.0.0.1');
// client.on('connect', function(){
//   console.log('connected to redis');
// })
// const userresult = "";
// console.time("Query_Time");


// function  handle_request(msg, callback){
//     var res = {};
//     console.log("\nIn kafka handle_request: "+ JSON.stringify(msg));
//     const regexname = new RegExp(msg.first_name,'i');
//     console.log("regex",regexname )
//     mongo.User.find({$or :[{"first_name":regexname},{"last_name":regexname}]},
//     function(err, users){
        
//         if(err){
//             console.log("inside 400");
//             res.code = "400";
//             res.value = "No users found";
//             res.sendStatus(400).end(); 
//         }else{
//             console.log("\nTotal users :  " + users.length);
//             console.log("Response from find users", users);
//             client.set(userresult,JSON.stringify(users),function(err){
//                 if(err) {
//                   return console.error(err);
//                 }
//               })

//              res.code= "200";
//              res.value = users;
//              console.log("\nRes in handle_request : " + res);
//              callback(null, res);
//         }
//     })
        
// //         .catch(err => {
// //           console.log("Error : ", err.response);
// //           res.status(500).json({
// //             message: "internal server error"
// //           });
// //         });
// //     }
// //   )
// }
   

 
    
// exports.handle_request = handle_request;
    