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
const io = require('socket.io')();
io.listen(3000)


router.get('/listallconnections', function(req, res, next) {
console.log("listallconnections request",req.query.email )
var list=[];
User.find({
email:{$ne:req.query.email }
}, function(err, users) {
//var emailuser = req.query.email;
User.find({
	email:{$eq:req.query.email }
	}, function(err, userone) {
		users.map(user=>{
		//	console.log("connections",userone.connections.length)
			console.log("user--->",userone[0])
			console.log(user)
			if(userone[0].connections.length) //all connection
			{
			for(var i=0;i<userone[0].connections.length;i++) //for all conn
			{
				console.log("Coming Here")
				if(user.email!=userone[0].connections[i].email) // if not in conection
				{
					list.push(user)
				}
			}}

			else{
				console.log("In ELSE")
				list.push(user)
				console.log("------------")
				console.log(list)
				console.log("------------")
			}
	})
	console.log("before sending response is ",list)
	res.status(200).json({responseData:list});
})
});
});

//sending connection request
router.post('/requestconnection', function(req, res, next) {
console.log("sending friend request to connection...",req.body)
console.log("from",req.body.from);
console.log("to",req.body.to)
var from = req.body.from;
			var to = req.body.to;
			//var username = req.body.from;
			// first add 'to' to 'from's waiting list
			var query = {email: from};
			var wtn = [];
            wtn.push(to);
            console.log("waiting req",wtn)
			var dataChange = {waiting:wtn};
			User.update(query, dataChange, function (err, user) {
				// now add 'from' to 'to's pending list
				User.findOne({email:to},function(err,data){
                    console.log(" pending requests",data)
					var pnd = data.pending;
                    pnd.push(from);
                    console.log("pending request before query sending pnd",pnd)
					dataChange = {pending:pnd};
					User.update({email:to},dataChange,function(err,user){
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
							io.sockets.emit('notification', {notificationData: notification});
							res.status(200).json({ disabled:true, success: true, notifData: notification });
							//res.status(200).json("notifData",notification);
							//res.redirect('/users/'+to);
						});
					});
				});
			});
})

//acceptconnection

// respond to friend request
router.post('/respondtorequest', function (req, res) {
	var ans = req.body.ans;
	if(ans === "Accept")
		console.log("Request Accepted...");
	else
		console.log("Request Rejected...");
			var from = req.body.from;
			var to = req.body.to;
			//var username = req.session.user.username;
			// first remove 'from' from 'to's pending list
			var pnd = req.body.pending;
			for(var i=0;i<pnd.length;i++)
				if(pnd[i]===from)
					break;
			pnd.splice(i,1);
			var friend = req.body.connections;
			if(ans === "Accept")
			friend.push(from);
			var dataChange = {pending:pnd,connections:friend};
			User.update({email:to}, dataChange, function (err, user) {

				// now remove 'to' from 'from's waiting list
				User.findOne({email:from},function(err,data){
					var existingWaitingList = data.waiting;
					for(var i=0;i<existingWaitingList.length;i++)
						if(existingWaitingList[i]===to)
							break;
							existingWaitingList.splice(i,1); //removed that particular element from list
					var friendList = data.connections;
					if(ans === "Accept")
					friendList.push(to);
						dataChange = {waiting:existingWaitingList,connections:friendList};
					User.update({email:from},dataChange,function(err,data_){
						// send notification of acceptance
						if(ans === "Accept"){
							var notification = { 
								body: to+" has accepted your friend request!",
								time: new Date().getTime(),
								status: "not_read",
								from: from,
								to: to,
                                type : "res",
                                connections:friendList
							};
							var newNotify = new Notification(notification).save(function (err) {
                                io.sockets.emit('notification', {notificationData: notification});
                                res.status(200).json({notification})
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
								type : "res"
							};
							var newNotify = new Notification(notification).save(function (err) {
                                io.sockets.emit('notification', {notifData: notifData});
                                res.status(200).json({notifData})
								//res.redirect('/users/'+username);
							});
						}
					});
				});
			});
});



module.exports = router;