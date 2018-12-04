var express = require('express');
const path = require('path');
var app = express();
var fs=require('file-system');
var session = require("express-session");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');
var users = require('./routes/users');
var messages = require('./routes/messages');
var applications = require('./routes/applications');
var dashboard = require('./routes/dashboard.js');
const multer = require('multer');
var jobpostings = require('./routes/postjob.js');
var jobs = require('./routes/jobs.js');
var activitytracker = require('./routes/activitytracker.js')
var activitytrackerincomplete = require('./routes/activitytrackerincomplete.js')
var dashboard = require('./routes/dashboard.js');
var jobs = require('./routes/jobs.js');
var getjobs = require('./routes/getjobs.js');
var activitytracker = require('./routes/activitytracker.js')
var activitytrackerincomplete = require('./routes/activitytrackerincomplete.js')
var listusernetwork = require('./routes/listusernetworks');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphqlschema/schema');
// var {User} = require('./models/user');
var search = require("./routes/search");
var uploadresume = require('./routes/uploadResume');
var getjobs = require('./routes/getjobs');
//const redis = require('redis');
var jobpostings = require('./routes/postjob')


const redis = require('redis');
var fs=require('file-system');
var useractivity = require('./routes/useractivity');
const url = "http://localhost:3000";
//const url = "hosting url";
app.use(cors({ origin: url, credentials: true }));

app.use(function(req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', url);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//redis client
// let client = redis.createClient(6379,'127.0.0.1');
// client.on('connect', function(){
//   console.log('connected to redis');
// })

app.use("/users", users);
app.use("/apply", applications);
app.use("/applications", applications);
app.use("/search", search);
app.use('/user', listusernetwork);
app.use('/uploadresume', uploadresume);
app.use('/getjobs', getjobs);


app.use('/userdata', activitytracker)
app.use('/incomplete', activitytrackerincomplete)
app.use('/jobs',jobs);
app.use('/recruiter',dashboard);
app.use('/',jobpostings)
app.use('/messages', messages);
app.use('/recruiter', dashboard);
app.use('/getjobs',getjobs);
app.use('/userdata',activitytracker);
app.use('/incomplete',activitytrackerincomplete);
//app.use('/useractivity',useractivity)
app.get("/start", (request, response) => {
  response.status(200).json({
    msg: "Welcome to Linkedin"
  });
});

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./resumeFolder");
//   },
//   filename: (req, file, cb) => {
//     const newFilename = `${file.originalname}`;
//     console.log("filename : " + newFilename);
//     cb(null, newFilename);
//   }
// });

// const uploadPhoto = multer({ storage });
// app.post("/uploadresume", uploadPhoto.single("selectedFile"), (req, res) => {
//   console.log("Inside photo upload Handler");
//   res.writeHead(200, {
//     "Content-Type": "text/plain"
//   });
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("req body " + JSON.stringify(req.body))
    console.log("applicant id passed in destination : " + req.body.applicant_id);
    console.log("selected file  : " + req.body.selectedFile);
    var currentFolder = 'public/resumeFolder/'+req.body.applicant_id+'/';
    fs.mkdir(currentFolder, function(err){
      if(!err) {
        console.log("no error : " + err);
        cb(null , currentFolder);
      } else {
         console.log("error : " + err);
        cb(null , currentFolder);
      }
    });
  },
  filename: function(req, file, cb){
  console.log("File to be uploaded : " + file.originalname);
  filename=Date.now()+'-'+file.originalname;
  cb(null, filename);
  }
});

const upload = multer({
  storage:storage,
  limits: {
    fileSize :1024*1024*5
  }
 });
app.post('/uploadresume', upload.single('selectedFile'), function(req, res, next){
  console.log("applicant id in uploadPhoto " + req.body.applicant_id)
  console.log("Filename " + filename)
    console.log("Inside photo upload Handler");
    res.writeHead(200,{
         'Content-Type' : 'text/plain'
        })
      res.end(JSON.stringify(filename))
});

app.use("/graphql",graphqlHTTP({
  schema,
  graphiql: true
}));
var server = app.listen(3001,()=>{
    console.log("Linkedin server has started to listen at http://localhost:3001" );
});
