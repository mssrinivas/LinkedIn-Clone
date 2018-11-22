var mongoose = require('mongoose');

var Messages = mongoose.model('Messages',{
    fromEmail : {type : String, required : true},
    toEmail : {type : String, required : true},
    MsgIn : {type : Array, required : false},
    
  
    
});

module.exports = {Messages};