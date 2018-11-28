var mongoose =require('mongoose');

var notificationschema = mongoose.Schema({
    body: String,
	from: String,
	to:String,
	status:String,
	time: Number,
	type: String
});
const Notification = mongoose.model('Notification',notificationschema);

module.exports.Notification = Notification;
