var express = require('express');
var router = express.Router();
var {Messages} = require('./../models/message');

// router.get('/ainbox/:ID', function(req, res, next) {
//     console.log("\n---Inside messages of user with ID ----"+ req.params.ID);
    
//     Messages.find({Applicant_id:req.params.ID}).then((chat)=> { 
//         console.log("\nNumber of chats: " + chat.length + "\n");
//         console.log("Chats : "+ chat );
        
//         res.writeHead(200,{
//             'Content-Type' : 'application/json'
//         })
//         res.end(JSON.stringify(chat));

//     }, (err) => {
//         console.log("error : " + err)
//         console.log("inside 400");
//     //     res.writeHead(400,{
//     //         'Content-Type' : 'text/plain'
//     //     })
//     //    res.end("Invalid");
//     res.sendStatus(201);
//     }
                  
//   );
// });
router.get('/ainbox/:ID', function(req, res, next) {
    console.log("\n---Inside messages of user with ID ----"+ req.params.ID);
    
    Messages.find({
        $or : [{ From_id:req.params.ID}, {To_id : req.params.ID}]
    }).then((chat)=> { 
        console.log("\nNumber of chats: " + chat.length + "\n");
        console.log("Chats : "+ chat );
        
        res.writeHead(200,{
            'Content-Type' : 'application/json'
        })
        res.end(JSON.stringify(chat));

    }, (err) => {
        console.log("error : " + err)
        console.log("inside 400");
   
    res.sendStatus(201);
    }
                  
  );
});
// router.get('/rinbox/:ID', function(req, res, next) {
//     console.log("\n---Inside messages of recruiter with ID ----"+ req.params.ID);
    
//     console.log("applicant id : " + req.params.ID)
//     Messages.find({Recruiter_id:req.params.ID}).then((chat)=> { 
//         console.log("\nNumber of chats: " + chat.length + "\n");
//         console.log("Chats : "+ chat );
//         res.writeHead(200,{
//             'Content-Type' : 'application/json'
//         })
//         res.end(JSON.stringify(chat));
//     }, (err) => {
//         console.log("error : " + err)
//         console.log("inside 400");
//     //     res.writeHead(400,{
//     //         'Content-Type' : 'text/plain'
//     //     })
//     //    res.end("Invalid");
//     res.sendStatus(201);
//     }
                  
//   );
// });

// router.post('/send', function(req, res, next) {
//     console.log("inside send message");
//     console.log("\nReq received : ", req.body);
//     Messages.findOne({Applicant_id:req.body.Applicant_id, Recruiter_id:req.body.Recruiter_id},function(err, chat) {
//         if(err){
//            // res.status(400).send("error occured")
//             res.sendStatus(400);
//         }
//         else{
//             if(chat){
//                 console.log("\nAlready have a chat\n");
//                 Messages.updateOne(
//                     {Applicant_id:req.body.Applicant_id, Recruiter_id:req.body.Recruiter_id}, 
//                     { $push: { Chat: req.body.Message } }).then(item => {
//                         console.log("Chat after adding this message : ", JSON.stringify(item));
//                         res.writeHead(200,{
//                             'Content-Type' : 'application/json'
//                         });
//                         res.end(JSON.stringify("Message sent"));
//                     })
//                     .catch(err => {
//                         console.log("error while updating chat", err);
//                         // res.status(400).json({
//                         //     message: "Message could not be sent"
//                         //   });
//                         res.sendStatus(201);
//                     })
//             }
//         }
//     })
// });
router.post('/send', function(req, res, next) {
    console.log("inside send message");
    console.log("\nReq received : ", req.body);
    Messages.findOne({_id:req.body.ID},function(err, chat) {
        if(err){
           // res.status(400).send("error occured")
            res.sendStatus(400);
        }
        else{
            if(chat){
                console.log("\nAlready have a chat\n");
                Messages.updateOne(
                    {_id:req.body.ID}, 
                    { $push: { Chat: req.body.Message } }).then(item => {
                        console.log("Chat after adding this message : ", JSON.stringify(item));
                        res.writeHead(200,{
                            'Content-Type' : 'application/json'
                        });
                        res.end(JSON.stringify("Message sent"));
                    })
                    .catch(err => {
                        console.log("error while updating chat", err);
                        // res.status(400).json({
                        //     message: "Message could not be sent"
                        //   });
                        res.sendStatus(201);
                    })
            }
        }
    })
});

// router.post('/send', function(req, res, next) {
//     console.log("inside send message");
//     console.log("\nReq received : ", req.body);
//     Messages.findOne({
//         $or : [
//             { 
//               $and : [ 
//                       {From_id : req.body.From_id},
//                       {To_id : req.body.To_id}
//                     ]
//             },
//             { 
//                $and : [ 
//                    {From_id: req.body.To_id},
//                    {To_id : req.body.From_id}
//                  ]
//             }]
//     },function(err, chat) {
//         if(err){res.status(400).send("error occured")}
//         else{
//             if(chat){
//                 console.log("\nAlready have a chat\n");
//                 Messages.updateOne(
//                     {
//                         $or : [
//                             { 
//                               $and : [ 
//                                       {From_id : req.body.From_id},
//                                       {To_id : req.body.To_id}
//                                     ]
//                             },
//                             { 
//                                $and : [ 
//                                    {From_id: req.body.To_id},
//                                    {To_id : req.body.From_id}
//                                  ]
//                             }]
//                     }, 
//                     { $push: { Chat: req.body.Message } }).then(item => {
//                         console.log("Chat after adding this message : ", item);
//                         res.writeHead(200,{
//                             'Content-Type' : 'application/json'
//                         });
//                         res.end(JSON.stringify("Message sent"));
//                     })
//                     .catch(err => {
//                         console.log("error while updating chat", err);
//                         res.status(400).json({
//                             message: "Message could not be sent"
//                           });
//                     })
//             }
//         }
//     })
// });
router.post('/startnew', function(req, res, next) {
    console.log("inside start new conversation");
    console.log("\nReq received : ", req.body);
    
    // const message = new Messages({
    
    //     Applicant_id : req.body.Applicant_id,
    //     Recruiter_id : req.body.Recruiter_id,
    //     Applicant_First_name : req.body.Applicant_First_name, 
    //     Applicant_Last_name : req.body.Applicant_Last_name,
    //     Recruiter_First_name : req.body.Recruiter_First_name,
    //     Recruiter_Last_name :req.body.Recruiter_Last_name,
    //     Chat : req.body.Message
    //     });
    //     message.save().then((item)=>{
    //     console.log("Message sent : ",item.Chat);
       
    //     res.writeHead(200,{
    //         'Content-Type' : 'application/json'
    //     });
    //     res.end(JSON.stringify("Started Conversation"))
    // })
    const message = new Messages({
    
        From_id : req.body.From_id,
        To_id : req.body.To_id,
        From_First_name : req.body.From_First_name, 
        From_Last_name : req.body.From_Last_name,
        To_First_name : req.body.To_First_name,
        To_Last_name :req.body.To_Last_name,
        Chat : req.body.Message
        });
        message.save().then((item)=>{
        console.log("Message sent : ",item.Chat);
       
        res.writeHead(200,{
            'Content-Type' : 'application/json'
        });
        res.end(JSON.stringify("Started Conversation"))
    })
});


module.exports = router;