var express = require('express');
var router = express.Router();
var utils = require('../util/utils');
var mysql=require('./mysql.js');
var {mongoose} = require('../db/mongoose');
const bodyParser = require('body-parser');
// var kafka = require('./../kafka/client');
var app = express();
var {User} = require('../models/user');
var {Notification}=require('../models/notification');
//const io = require('socket.io')();
//io.listen(3000)


// router.get('/listallconnections', function(req, res, next) {
// console.log("listallconnections request",req.query.email )
// var list=[];
// User.find({
// email:{$ne:req.query.email }
// }, function(err, users) {
// //var emailuser = req.query.email;
// User.find({
// 	email:{$eq:req.query.email }
// 	}, function(err, userone) {
// 		users.map(user=>{
// 		//	console.log("connections",userone.connections.length)
// 			console.log("user--->",userone[0])
// 			console.log(user)
// 			if(userone[0].connections.length) //all connection
// 			{
// 			for(var i=0;i<userone[0].connections.length;i++) //for all conn
// 			{
// 				console.log("Coming Here")
// 				if(user.email!=userone[0].connections[i].email) // if not in conection
// 				{ console.log("if starts***********************")
// 					list.push(user);
// 					console.log("if end***********************")
// 				}
// 			}}

// 			else{
// 				console.log("In ELSE")
// 				list.push(user)
// 				console.log("------------")
// 				console.log(list)
// 				console.log("------------")
// 			}
// 	})
// 	console.log("before sending response is ",list)
// 	res.status(200).json({responseData:list});
// })
// });
// });




//sending connection request
router.post('/requestconnection', function(req, res, next) {
console.log("sending friend request to connection...",req.body)
console.log("from",req.body.from);
console.log("to",req.body.to)
console.log("to",req.body.fromDetails)
var from = req.body.from;
			var to = req.body.to;
		
			//var username = req.body.from;
			// first add 'to' to 'from's waiting list
			User.findOne({email:from},function(err,data){
				console.log("from user data->",data)
			var wtn = data.waiting;
			
            wtn.push(to);
            console.log("waiting req",wtn)
			var dataChange = {waiting:wtn};
			User.update({email: from}, dataChange, function (err, user) {
				// now add 'from' to 'to's pending list
				User.findOne({email:to},function(err,data){
					var pnddata={
						email: from,
						first_name:req.body.fromDetails.first_name,
						last_name:req.body.fromDetails.last_name,
						job_title:"Software Engineer"
					}
                   // pnd.push(from);
                    console.log("pending request before query sending pnd",pnddata)
					//dataChange = {pending:pnd};
					User.update({email:to}, { $push: {pending: pnddata }},function(err,user){
						// if all successful, send notification message
						var notification = new Notification( { 
							body: from+" has sent you a friend request!",
							time: new Date().getTime(),
							status: "not_read",
							from: from,
							to: to,
							type : "req"
						});
						notification.save( function (err) {
							//io.sockets.emit('notification', {notificationData: notification});
							res.status(200).json({ disabled:true, success: true, notifData: notification });
							//res.status(200).json("notifData",notification);
							//res.redirect('/users/'+to);
						});
					});
				});
			});
		});
})

// respond to friend request
router.post('/respondtorequest', function (req, res) {
	console.log("user response",req.body)
	var ans = req.body.ans;
	if(ans === "Accept")
		console.log("Request Accepted...");
	else if(ans==="Reject")
		console.log("Request Rejected...");
			var from = req.body.from;
			var to = req.body.to;
			var toUserDetails=req.body.toUserDetails;
			// first remove 'from' from 'to's pending list
			User.findOne({email:to},function(err,data){
			var pnd = data.pending;
			console.log("pending data of user***********",data.pending)
			for(var i=0;i<pnd.length;i++)
				if(pnd[i].email===from)
					break;
			pnd.splice(i,1);
			//var friend = data.connections;
			//if(ans === "Accept") //here cud be problem *1
			//friend.push(from);
			User.findOne({email:from},function(err,data){
				console.log("after acceptiong...data..is..",data)
			 var friend={
				email:from,
				first_name:data.first_name,
				last_name:data.last_name,
				job_title:data.job_title,
				experience:data.experience,
			 }
			 console.log("friendlist 1->",friend)
			console.log("Data changed  after accept", pnd)
			if(ans === "Accept") 
			var dataChange={$push: { connections: friend},$set:{pending:pnd}}
			if(ans=="Reject")
			var dataChange={$set:{pending:pnd}}
			User.update({email:to},dataChange, function (err, user) {

				// now remove 'to' from 'from's waiting list
				User.findOne({email:from},function(err,data){
					var existingWaitingList = data.waiting;
					for(var i=0;i<existingWaitingList.length;i++)
						if(existingWaitingList[i]===to)
							break;
							existingWaitingList.splice(i,1); //removed that particular element from list

					var friendList = data.connections;
					//if(ans === "Accept")
					//friendList.push(to);
					var friend={
						email:to,
						first_name:toUserDetails.first_name,
						last_name:toUserDetails.last_name,
						job_title:toUserDetails.job_title,
						experience:toUserDetails.experience, //here data might come from different frontend store,confirm wd team
					}
					console.log("friendlist 2->",friend)
					if(ans === "Accept")
					var dataChange={ $push: { connections: friend} ,$set:{waiting: existingWaitingList }}
					if(ans === "Reject")
					var dataChange={$set:{waiting: existingWaitingList }}
					User.update({email:from},dataChange,function(err,data){
						// send notification of acceptance
						if(ans === "Accept"){
							var notification = { 
								body: to+" has accepted your friend request!",
								time: new Date().getTime(),
								status: "not_read",
								from: from,
								to: to,
                                type : "res",
								connections:friendList,
								pending:pnd
							};
							var newNotify = new Notification(notification).save(function (err) {
								//io.sockets.emit('notification', {notificationData: notification});
								res.status(200).json({ disabled:true, success: true, notifData: notification });
                                //res.status(200).json({notification})
								//res.redirect('/users/'+from);
							});
						}
					
						// send notification of rejection
						else{
							var notification = { 
								body: to+" has rejected your friend request!",
								time: new Date().getTime(),
								status: "not_read",
								from: from,
								to: to,
								type : "res",
								pending:pnd
							};
							var newNotify = new Notification(notification).save(function (err) {
								//io.sockets.emit('notification', {notifData: notifData});
								res.status(200).json({ disabled:true, success: true, notifData: notification });
                                //res.status(200).json({notifData})
								//res.redirect('/users/'+username);
							});
						}
					});
				
				});
			});
		});
		});
});



module.exports = router;