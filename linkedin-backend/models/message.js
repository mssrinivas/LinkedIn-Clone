    var mongoose = require('mongoose');

    // var Messages = mongoose.model('Messages',{
    //     Applicant_id : {type : String, required : true},
    //     Recruiter_id : {type : String, required : true},
    //     Applicant_First_name : {type : String, required : false},
    //     Applicant_Last_name : {type : String, required : false},
    //     Chat : {type : Array, required : false},
    //     Recruiter_First_name : {type : String, required : false},
    //     Recruiter_Last_name : {type : String, required : false},
    // });
    var Messages = mongoose.model('Messages',{
            From_id : {type : String, required : true},
            To_id : {type : String, required : true},
            From_First_name : {type : String, required : false},
            From_Last_name : {type : String, required : false},
            Chat : {type : Array, required : false},
            To_First_name : {type : String, required : false},
            To_Last_name : {type : String, required : false},
        });

    module.exports = {Messages};
