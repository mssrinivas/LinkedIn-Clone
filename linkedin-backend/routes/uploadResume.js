var express = require('express');
var router = express.Router();
var mysql=require('./mysql.js');
const multer = require('multer');
// var localStorage=require('localStorage');
var fs=require('file-system');

const storage=multer.diskStorage({
  destination :function(req,file, cb) {
    console.log("Property id passed is: ",req.body.applicant_id)
    var currentFolder = 'public/resumeFolder/' + req.body.applicant_id +'/';
    fs.mkdir(currentFolder, function(err){
      if(!err) {
        console.log("no error");
        cb(null , currentFolder);
      } else {
         console.log("error");
        cb(null , currentFolder);
      }
    });
  },
  filename: function(req,file,cb){
    console.log(file.originalname);
    cb(null, Date.now()+'-'+file.originalname);
  }
});

// const fileFilter =(req,file, cb) => {
//   if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'|| file.mimetype==='image/jpg' || file.mimetype==='image/jpg') {
//     cb(null,true);
//   }
//   else {
//     cb(null,false);
//   }
// }

const upload=multer({
    storage: storage,
    limits: {
      fileSize :1024*1024*5
    }
  });


router.post('/uploadresume' , upload.single('photos'), function(req , res , next) {
  console.log("Inside upload resume pic API");
  console.log("Username passed is: ",req.body.applicant_id);
  console.log(req.body);
  res.status(200).json({message : "Resume uploaded successfully!"})

});

module.exports = router;
