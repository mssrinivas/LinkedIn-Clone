var express = require('express');
var router = express.Router();
var {Messages} = require('./../models/message');

router.get('/ainbox/:ID', function(req, res, next) {
    console.log("\n---Inside messages of user with ID ----"+ req.params.ID);
    
    console.log("applicant id : " + req.params.ID)
    Messages.find({Applicant_id:req.params.ID}).then((chat)=> { 
        console.log("\nNumber of chats: " + chat.length + "\n");
        console.log("Chats : "+ chat );
        res.writeHead(200,{
            'Content-Type' : 'application/json'
        })
        res.end(JSON.stringify(chat));
    }, (err) => {
        console.log("error : " + err)
        console.log("inside 400");
        res.writeHead(400,{
            'Content-Type' : 'text/plain'
        })
       res.end("Invalid");
    }
                  
  );
});
router.get('/rinbox/:ID', function(req, res, next) {
    console.log("\n---Inside messages of recruiter with ID ----"+ req.params.ID);
    
    console.log("applicant id : " + req.params.ID)
    Messages.find({Recruiter_id:req.params.ID}).then((chat)=> { 
        console.log("\nNumber of chats: " + chat.length + "\n");
        console.log("Chats : "+ chat );
        res.writeHead(200,{
            'Content-Type' : 'application/json'
        })
        res.end(JSON.stringify(chat));
    }, (err) => {
        console.log("error : " + err)
        console.log("inside 400");
        res.writeHead(400,{
            'Content-Type' : 'text/plain'
        })
       res.end("Invalid");
    }
                  
  );
});

router.post('/send', function(req, res, next) {
    console.log("inside send message");
    console.log("\nReq received : ", req.body);
    Messages.findOne({Applicant_id:req.body.Applicant_id, Recruiter_id:req.body.Recruiter_id},function(err, chat) {
        if(err){res.status(400).send("error occured")}
        else{
            if(chat){
                console.log("\nAlready have a chat\n");
                Messages.update(
                    {Applicant_id:req.body.Applicant_id, Recruiter_id:req.body.Recruiter_id}, 
                    { $push: { Chat: req.body.msg } })
                    .exec()
                    .then(item => {
                        console.log("Chat after adding this message : ", item);
                        res.writeHead(200,{
                            'Content-Type' : 'application/json'
                        });
                        res.end(JSON.stringify("Message sent"));
                    })
                    .catch(err => {
                        console.log("error while updating chat", err);
                        // res.status(400).json({
                        //     message : "User profile could not be updated"
                        // });
                    })
            }
            else{
                const message = new Messages({
    
                    Applicant_id : req.body.Applicant_id,
                    Recruiter_id : req.body.Recruiter_id,
                    Chat : req.body.msg
                    });
                    message.save().then((item)=>{
                    console.log("Message sent : ",item.MsgIn);
                    // res.sendStatus(200).end();
                    res.writeHead(200,{
                        'Content-Type' : 'application/json'
                    });
                    res.end(JSON.stringify("Message sent"));
                },(err)=>{
                    console.log("Error While adding message");
                })
            }
        }
    })
    
                  
  });
  module.exports = router;