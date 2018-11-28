var express = require('express');
const path = require('path');
var app = express();
var session = require("express-session");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');
var users = require('./routes/users');
var applications = require('./routes/applications');
const multer = require('multer');
var jobs = require('./routes/jobs.js');
var listusernetwork = require('./routes/listusernetworks');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphqlschema/schema');
// var {User} = require('./models/user');
var search = require("./routes/search");
var uploadresume = require('./routes/uploadResume');
const redis = require('redis');

const url = "http://localhost:3002";
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
app.use("/jobs", jobs);
//app.use("/search", search);
app.use('/user', listusernetwork);
app.use('/uploadresume', uploadresume);

app.get("/start", (request, response) => {
  response.status(200).json({
    msg: "Welcome to Linkedin"
  });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./resumeFolder");
  },
  filename: function(req, file, cb){
  const newFilename = `${file.originalname}`;
  e = `${file.originalname}`;
  console.log("applicant id passed in filename: " + req.body.applicant_id);
  // console.log("request applicant id :" + req.body.applicant_id);
  console.log("filename : " + newFilename);
  cb(null, Date.now()+'-'+newFilename);
  
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
    console.log("Inside photo upload Handler");
    res.writeHead(200,{
         'Content-Type' : 'text/plain'
        })
});



app.use("/graphql",graphqlHTTP({
  schema,
  graphiql: true
}));


var server = app.listen(3001,()=>{
    console.log("Linkedin server has started to listen at http://localhost:3001" );
});
