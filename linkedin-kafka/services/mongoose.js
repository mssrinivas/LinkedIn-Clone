var mongoose = require('mongoose');
//var config = require('../config/keys');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://linkedin:linkedin123@ds163683.mlab.com:63683/linkedin');
//mongoose.connect('mongodb://localhost:27017/homeaway', {poolSize: 10});

module.exports.Applications =  mongoose.model('Applications',{
    Job_id :{type : String, required : true},
    CompanyName :{type : String, required : true},
    JobTitle : {type : String, required : true},
    JobLocation : {type : String, required : true},
    Applicant_id :{type : String, required : true},
    Email :{type : String, required: true},
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
    appliedDate : {type : Date, required: false}
});


module.exports.User =  mongoose.model('User',{
    applicant_id : {type: String},
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
module.exports.jobpostings =  mongoose.model('jobpostings',{

    CompanyName :{type : String, required: true},
    Email :{type : String, required: true},
    CompanyLogo :{type : String, required: false},
    JobTitle :{type : String, required: true},
    jobFunction :{type : String, required: true},
    JobLocation :{type : String, required: true},
    numberofApplicants :{type : Number, required: false}, //number of applicants applied for this job
    seniorityLevel : {type : String, required: true},
    description :{type : String, required: true}, 
    postingDate : {type : Date, required: true}, 
    employmentType : {type : String, required: true}, 
    industryType : {type : String, required: true}, 
    experience : {type : Number, required: true}, 
    budget : {type : Number, required: true}, 
    easyApply : {type : Boolean, default : false, required : true}
});


