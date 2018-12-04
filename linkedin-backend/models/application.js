var mongoose = require('mongoose');
var Applications = mongoose.model('Applications',{
    Job_id :{type : String, required : true},
    CompanyName :{type : String, required : true},
    JobTitle : {type : String, required : true},
    JobLocation : {type : String, required : true},
    Applicant_id :{type : String, required : true},
    Email :{type : String, required: true},
    RecruiterEmail : {type : String, required: true},
    Applied :{type : Boolean, default : false, required : true},
    Saved :{type : Boolean, default : false, required : true},
    easyApply : {type : Boolean, default : false, required : true},
    CompanyLogo : {type : String, required : false},
    HowDidYouHear : {type : String, required: false},
    resume : {type : String, required: false},
    cover_letter : {type : String, required: false},
    First_name : {type : String, required : false},
    Last_name : { type : String, required : false},
    Address :{type : String, required : false},
    Phone :{type : String, required : false},
    Gender :{type : String, required : false},
    Race :{type : String, required : false},
    Veteran :{type : String, required : false},
    Disability :{type : String, required : false},
    appliedDate : {type : Date, required: false},
    postingDate : {type : Date, required: false}
});
module.exports = {Applications};
