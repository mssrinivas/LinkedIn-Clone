var mongoose = require('mongoose');
var JobPostings = mongoose.model('JobPostings',{
    CompanyName :{type : String, required: true},
    Email :{type : String, required: true},
    CompanyLogo :{type : String, required: false},
    JobTitle :{type : String, required: true},
    jobFunction :{type : String, required: true},
    JobLocation :{type : String, required: true},
    State:{type: String, required: false},
    numberofApplicants :{type : Number, required: false}, //number of applicants applied for this job
    seniorityLevel : {type : String, required: true},
    description :{type : String, required: true}, 
    postingDate : {type : Date, required: true}, 
    employmentType : {type : String, required: true}, 
    industryType : {type : String, required: true}, 
    experience : {type : Number, required: true}, 
    degree: {type : String, required: true}, 
    budget : {type : Number, required: true}, 
    easyApply : {type : Boolean, default : false, required : true},
    recruiterName : {type : String, required: true},
    ZipCode : {type : Number, required: true}
});

module.exports = {JobPostings};







