var mongoose =require('mongoose');

var userschema = mongoose.Schema({
    applicant_id : {
      type: String
    },
    first_name : {
        type : String,
        required : true
    },
    last_name : {
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    recruiter_flag : {
        type : Number
    },
    address : {
        type : String
    },
    state : {
        type : String
    },
    city : {
        type : String
    },
    zip_code : {
        type : Number
    },
    experience : {
        type : String
    },
    education : {
        type : String
    },
    school : {
      type : String
    },
    skills : {
        type : String
    },
    profile_summary : {
        type : String
    },
    profile_img : {
        type : String
    },
    resume_path: {type : Array, required : false},
    saved_job : {type : Array, required : false},
    applied_job:{type : Array, required : false}
});

const User = mongoose.model('User',userschema);

module.exports.User = User;
