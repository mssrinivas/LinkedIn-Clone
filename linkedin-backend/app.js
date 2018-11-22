var express = require('express');
var app = express();
var session = require('express-session');
var cors = require('cors');
var cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');
var users = require('./routes/users');
var applications = require('./routes/applications');
const multer = require('multer');
var jobs = require('./routes/jobs.js');
//var fs = require('fs');
const path = require('path');
 var fs1 =require('file-system');
const url = "http://localhost:3000";
//const url = "hosting url";
app.use(cors({origin:url,credentials:true}));
// app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', url);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/users', users);
app.use('/apply', applications);
app.use('/applications', applications);
app.use('/jobs',jobs);

app.get("/start",(request,response)=>{
	response.status(200).json({
		msg : "Welcome to Linkedin"
	});
});

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, './resumeFolder');
//     },
//     filename: (req, file, cb) => {
//     const newFilename = `${file.originalname}`;
//     console.log("request applicant id :" + req.body.applicant_id);
//     console.log("filename : " + newFilename);
//     cb(null,  req.body.applicant_id+'-'+newFilename);
//     // cb(null, newFilename);
//     },
// });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("req body " + JSON.stringify(req.body))
    console.log("applicant id passed in destination : " + req.body.Applicant_id);
    console.log("selected file  : " + req.body.selectedFile);
    var currentFolder = 'public/resumeFolder/'+req.body.Applicant_id+'/';
    fs1.mkdir(currentFolder, function(err){
      if(!err) {
        console.log("no error : " + err);
        cb(null , currentFolder);
      } else {
         console.log("error : " + err);
        cb(null , currentFolder);
      }
    });
    // cb(null, './resumeFolder');

  },
  filename: (req, file, cb) => {
  const newFilename = `${file.originalname}`;
  console.log("applicant id passed in filename: " + req.body.Applicant_id);
  // console.log("request applicant id :" + req.body.applicant_id);
  console.log("filename : " + newFilename);
  cb(null, newFilename);
  
  }
});

const uploadPhoto = multer({ storage });
app.post('/uploadresume', uploadPhoto.single('selectedFile'), (req, res, next) => {
  console.log("applicant id in uploadPhoto " + req.body.Applicant_id)
    console.log("Inside photo upload Handler");
    res.writeHead(200,{
         'Content-Type' : 'text/plain'
         })
});


// app.post('/download/:file(*)',(req, res) => {
//   console.log("Inside download file");
//   var file = req.params.file;
//   // console.log("downloading file : " + file.filename);
//   var fileLocation = path.join(__dirname + '/resumeFolder',file);
//   var pdfFile = fs.readFileSync(fileLocation);
//   // console.log("pdffile" + pdfFile)
//   //var base64img = new Buffer(img).toString('base64');
//  consoel.log("filename " + fileLocation);
//   //res.writeHead(200, {'Content-Type': 'application/pdf','Content-disposition': 'inline; filename=' + file});
//   res.writeHead(200, {'Content-Type': 'application/pdf','Content-Disposition': 'attachment; filename=' + file});
//   res.end(file);
// });



var server = app.listen(3001,()=>{
    console.log("Linkedin server has started to listen at http://localhost:3001" );
});
