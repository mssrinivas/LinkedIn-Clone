var mongoose = require('mongoose');
var Applications = mongoose.model('Applications',{
    Job_id :{type : String, required : false},
    Applicant_id :{type : String, required : false},
    Email :{type : String, required: true},
    HowDidYouHear : {type : String, required: true},
    resume : {type : String, required: true},
    cover_letter : {type : String, required: false},
    First_name : {type : String, required : true},
    Last_name : { type : String, required : true},
    Address :{type : String, required : false},
    Phone :{type : String, required : false},
    Gender :{type : String, required : false},
    Race :{type : String, required : false},
    Veteran :{type : String, required : false},
    Disability :{type : String, required : false},
});
module.exports = {Applications};