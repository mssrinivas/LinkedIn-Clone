// var mongo = require('./mongoose');

// function  handle_request(msg, callback){
//     var res = {};
//     console.log("In handle request:"+ JSON.stringify(msg));
//     mongo.Applications.findOne({Applicant_id:msg.Applicant_id, Job_id:msg.id, Saved:true, Applied:false},function(err, doc) {
//         if(err){res.status(400).send("error occured")}
//         else{
//             if(doc){
//                 console.log("\n..found saved application....\n");
//                 mongo.Applications.updateOne(
//                     {Applicant_id:msg.Applicant_id, Job_id:msg.id, Saved:true, Applied:false}, 
//                     {$set : 
//                          {
//                             HowDidYouHear: msg.hear,
//                             Email : msg.email,
//                             resume: msg.resume,
//                             First_name: msg.firstname,
//                             Last_name: msg.lastname,
//                             Address :msg.address,
//                             Phone : msg.contact,
//                             Gender : msg.gender,
//                             Race : msg.race,
//                             Veteran : msg.veteran,
//                             Disability : msg.disability,
//                             Applied : true,
//                             Saved : false,
//                          }
//                      })
//                     .then(item => {
                        
           
//                         console.log("application after update : ", item);
//                         res.data="200"
//                         res.value="Applied successfully"
//                         console.log("\nResponse : " + JSON.stringify(res));
//                         callback(null, res)
                       
                       
//                     })
//                     .catch(err => {
//                         console.log("error while updating saved application", err);
//                         res.sendStatus(400).end();
//                         // res.status(400).json({
//                         //     message : "User profile could not be updated"
//                         // });
//                     })
//             }
//             else{
//                 const customApplyDetail = mongo.Applications({
//                     Applicant_id : msg.Applicant_id,
//                     HowDidYouHear: msg.hear,
//                     Email : msg.email,
//                     resume: msg.resume,
//                     First_name: msg.firstname,
//                     Last_name: msg.lastname,
//                     Address : msg.address,
//                     Phone : msg.contact,
//                     Gender : msg.gender,
//                     Race : msg.race,
//                     Veteran : msg.veteran,
//                     Disability : msg.disability,
//                     CompanyName : msg.company,
//                     JobTitle : msg.jobtitle,
//                     JobLocation : msg.joblocation,
//                     Applied : true,
//                     Saved : false,
//                     CompanyLogo : msg.companyLogo,
//                     Job_id : msg.id,
//                     easyApply : msg.easyApply,
//                     appliedDate :msg.appliedDate
//                 });
//                 customApplyDetail.save().then((result)=> {
//                     console.log("apply successful : ",result);
//                                      // res.sendStatus(200).end();
//                     res.data="200"
//                     res.value="Applied successfully"
//                     console.log("\nResponse : " + JSON.stringify(res));
//                     callback(null, res)
//                 },(err)=>{
//                     console.log("Error While applying custom job");
//                     res.sendStatus(400).end();
    
//                 })
//             }
//         }
//     })
   
// }
// exports.handle_request = handle_request;

