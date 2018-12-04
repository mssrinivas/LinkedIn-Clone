    var mongoose = require('mongoose');

    var Messages = mongoose.model('Messages',{
        Applicant_id : {type : String, required : true},
        Recruiter_id : {type : String, required : true},
        First_name : {type : String, required : false},
        Last_name : {type : String, required : false},
        Chat : {type : Array, required : false},
    });
    // var Messages = mongoose.model('Messages',{
    //     From_id : {type : String, required : true},
    //     To_id : {type : String, required : true},
    //     First_name : {type : String, required : false},
    //     Last_name : {type : String, required : false},
    //     Chat : {type : Array, required : false},
    // });

    module.exports = {Messages};