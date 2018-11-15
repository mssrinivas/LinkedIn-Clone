var mongoose = require('mongoose');
var Users = mongoose.model('Users',{
    Email :{type : String, required: true},
    Password : {type : String, required : true},
    First_name : {type : String, required : true},
    Last_name : { type : String, required : true},
    Address :{type : String, required : false},
    City : {type : String, required : false},
    State : {type : String, required : false},
    Country : {type : String, required : false},
    ZipCode : {type : String, required : false},
    Experience : {type : String, required : false},
    Education : {type : String, required : false},
    Skills: {type : String, required : false},
    Profile_Summary :{type : String, required : false},
    serverToken :{type : String, required : false},
    resume :{type : String, required : false},
    phone :{type : String, required : false},
    userType :{type : String, required : false}
 });
module.exports = {Users};