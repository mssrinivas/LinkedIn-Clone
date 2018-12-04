var mongoose = require('mongoose');

var UserActivityIncomplete = mongoose.model('UserActivityIncomplete',{
    RecruiterEmail :{type : String, required: true},
    JobTitle : {type : String, required: true},
});

module.exports = {UserActivityIncomplete};
