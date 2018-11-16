var mongoose = require('mongoose');
var Applications = mongoose.model('Applications',{
    Email :{type : String, required: true},
    HowDidYouHear : {type : String, required: true},
    resume : {type : String, required: true},
    First_name : {type : String, required : true},
    Last_name : { type : String, required : true},
    Address :{type : String, required : false},
    City : {type : String, required : false},
    State : {type : String, required : false},
    Country : {type : String, required : false},
    ZipCode : {type : String, required : false},
 });
module.exports = {Applications};