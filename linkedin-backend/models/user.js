var mongoose =require('mongoose');

var userschema = mongoose.Schema({
    first_name : {
        type : String
    },
    last_name : {
        type : String
    },
    password :{
        type : String
    },
    email : {
        type : String
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
    skills : {
        type : String
    },
    profile_summary : {
        type : String
    },
    profile_img : {
        type : String
    }
});

const User = mongoose.model('User',userschema);

module.exports.User = User;
