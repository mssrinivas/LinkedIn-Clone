var mongoose = require('mongoose');

var UserActivityIncomplete = mongoose.model('UserActivityIncomplete',{
    Company :{type : String, required: true},
    Title : {type : String, required: true}
});

module.exports = {UserActivityIncomplete};







