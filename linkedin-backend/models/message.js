    var mongoose = require('mongoose');

    var Messages = mongoose.model('Messages',{
        Applicant_id : {type : String, required : true},
        Recruiter_id : {type : String, required : true},
        Chat : {type : Array, required : false},
    });

    module.exports = {Messages};