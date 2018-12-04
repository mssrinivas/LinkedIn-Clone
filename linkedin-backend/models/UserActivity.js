var mongoose = require('mongoose');

var UserActivity = mongoose.model('UserActivity',{
    Company :{type : String, required: true},
    Title : {type : String, required: true},
    recruiterName : {type: String, required: true}
});

module.exports = {UserActivity};
