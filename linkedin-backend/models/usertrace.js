var mongoose =require('mongoose');

var usertraceschema = mongoose.Schema({
    applicant_id : {
      type: String
    },
    timestamp : {
      type: String
    },
    viewer_applicant_id : {
      type: String
    }
});

const UserTrace = mongoose.model('UserTrace',usertraceschema);

module.exports.UserTrace = UserTrace;
