import React,{ Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './applicantprofile.css';
import LineChart from './../graph/line_chart';
import BarChart from './../graph/barchart';
import Navbar from './../navbar/Navbar.jsx';
import {userSearch} from './../../api/Api';
import CityApplications from './citywiseapplication';
import { Link } from "react-router-dom";
import {history} from "../../util/utils";
import {jobtitleUpdate} from './../../api/Api';
import Chart from './chart.js';
import axios from 'axios';
import '../RecruiterDashboard/RecruiterDashboard.css'
import {BASE_URL} from './../../components/constants/constants.js';

class RecruiterDashBoard extends Component {
  constructor(props) {
    super(props);
    this.state={
      map:'',
      chartData: {},
      jobData: {},
      savedJobData: {},
      userActivityData: {},
      clickJobData: {},
      jobListings: {},
      topTenJobsData : []
    }
    this.userDetails={
      recruiter_title:''
    };
    this.cityHandler=this.cityHandler.bind(this);
  }
  cityHandler = e =>{
    this.userDetails.recruiter_title = e.target.value;
    this.props.jobtitleUpdate(this.userDetails.recruiter_title);
  }
  parseData() {
      var graphData = new Array();
      for(var i = 0 ; i< this.props.applicationDetails.length ; i++) {
        var data = {};
        data.date=this.props.applicationDetails[i].Job_id;
        data.applicant_id=this.props.applicationDetails[i].Applicant_id;
        graphData.push(data);

      }
    this.state.map = new Map();
    var count=1;
    for(var i = 0 ; i < graphData.length;i++) {
        if(this.state.map.has(graphData[i].date)) {
           count = this.state.map.get(graphData[i].date);
           count++;
        }
        else {
          count=1;
        }
        this.state.map.set(graphData[i].date,count);
    }
  }
  getAdminDashBoardGraph(map,label_name, header_text){
    var labels = new Array();
    var datasets = new Array();
    this.state.map[Symbol.iterator] = function* () {
    yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
    }
    // for (let [key, value] of this.state.map) {
    //     console.log(key + ' ' + value);
    // }
    var count=1;
    for(let [key, value] of this.state.map) {
      for(var i = 0 ; i<=this.props.applicationDetails.length-1;i++) {
        if(key == this.props.applicationDetails[i].Job_id && count <=5) {
          labels.push(this.props.applicationDetails[i].JobTitle);
          datasets.push(value);
          count++;
          break;
        }
      }
    }
    if(map.size >0){
        var data={
          labels: labels,
          datasets:datasets,
          labelName:label_name,
          header_text:header_text
         }
      return (<BarChart data={data}/>)
    }else{
      return (<h2 style={{color:"red"}}> Analysis data not available </h2>)
    }
}
componentWillMount() {
  this.getArrayData();
}
componentDidMount() {

}
getArrayData() {
  var labeldb = [];
  var labeldatadb = [];
  var labelsavedJobs = [];
  var labelsavedjobsdata = [];
  var labelhalffilled = [];
  var labelhalffilleddata = [];
  var labelfullfilled = [];
  var labelfullfilleddata = [];
  var labeltopjobs = [];
  var labeltopjobsdata = [];
  var labelalljobs = [];
  var labelalljobsdata = [];
  const url = `${BASE_URL}/getjobs/tenjobs`;
  axios.get(url,{
      params: {
        mail: this.props.currentUserDetails.email
      }}).then((response)=>{
        var TenJobdatadb = [];
        TenJobdatadb = response.data.joblistings;
        this.setState({jobListings : response.data.joblistings})
        var counterdb = {};
        TenJobdatadb.forEach(function(obj) {
          labeltopjobs.push(obj.JobTitle);
          labeltopjobsdata.push(obj.numberofApplicants);
        });
        console.log("label for db Ten Jobs", labeltopjobs);
        console.log("labeldata for db Ten Jobs", labeltopjobsdata);
        this.setState({});
      },
      error => {
      }
    )
    const url_2 = `${BASE_URL}/getjobs/myjobs`;
  axios.get(url_2,{
      params: {
        mail: this.props.currentUserDetails.email
      }}).then((response)=>{
        var AllJobdatadb = [];
        AllJobdatadb = response.data.joblistings;
        this.setState({jobListings : response.data.joblistings})
        var counterdb = {};
        AllJobdatadb.forEach(function(obj) {
            console.log("--------JOB OBJ IS---------- " + JSON.stringify(obj));
          var key = obj.CompanyName + " " + obj.JobTitle;
          counterdb[key] = (counterdb[key] || 0) + 1;
          var resultAllJobsdb = Object.keys(counterdb).map(function(key) {
            var key1 = key.substr(key.indexOf(" ") + 1);
            return [key1, counterdb[key]];
          });
          for (var i = 0; i < resultAllJobsdb.length; i++) {
            labelalljobs[i] = resultAllJobsdb[i][0];
            labelalljobsdata[i] = resultAllJobsdb[i][1];
          }
        });
        console.log("label for db ALL Jobs", labelalljobs);
        console.log("labeldata for db ALL Jobs", labelalljobsdata);
        this.setState({});
      },
      error => {
      }
    )
  axios.get(`${BASE_URL}/recruiter/getuserclicks`,
  {
    params: {
      mail: this.props.currentUserDetails.first_name + " " + this.props.currentUserDetails.last_name
    }}).then(
      response => {
      var clickedJobdatadb = [];
      clickedJobdatadb = response.data;
      var counterdb = {};
      clickedJobdatadb.forEach(function(obj) {
          console.log("OBJ IS" + JSON.stringify(obj));
        var key = obj.Company.jobId + " " + obj.Title;
        counterdb[key] = (counterdb[key] || 0) + 1;
        var resultClickedJobsdb = Object.keys(counterdb).map(function(key) {
          var key1 = key.substr(key.indexOf(" ") + 1);
          return [key, counterdb[key]];
        });
        for (var i = 0; i < resultClickedJobsdb.length; i++) {
          labeldb[i] = resultClickedJobsdb[i][0];
          labeldatadb[i] = resultClickedJobsdb[i][1];
        }
      });
      console.log("labelk for db", labeldb);
      console.log("labeldata for db", labeldatadb);
      this.setState({});
    },
    error => {
    }
  )

  axios.get(`${BASE_URL}/recruiter/halffilled`,{
    params: {
      mail: this.props.currentUserDetails.email
    }}
  ).then(
      response => {
      var halfFilledJobdatadb = [];
      halfFilledJobdatadb = response.data;
      var counterdb = {};
      halfFilledJobdatadb.forEach(function(obj) {
          console.log("OBJ IS" + JSON.stringify(obj));
        var key = obj.JobTitle;
        counterdb[key] = (counterdb[key] || 0) + 1;
        var resulthalfFilledJobsdb = Object.keys(counterdb).map(function(key) {
         // var key = key.substr(key.indexOf(" ") + 1);
          return [key, counterdb[key]];
        });
        for (var i = 0; i < resulthalfFilledJobsdb.length; i++) {
          labelhalffilled[i] = resulthalfFilledJobsdb[i][0];
          labelhalffilleddata[i] = resulthalfFilledJobsdb[i][1];
        }
      });
      console.log("HALF FILLED label for db", labelhalffilled);
      console.log("HALF FILLED labeldata for db", labelhalffilleddata);
      this.setState({});
    },
    error => {
    }
  )

  axios.get(`${BASE_URL}/recruiter/fullfilled`,{
    params: {
      mail: this.props.currentUserDetails.email
    }}).then(
      response => {
      var fullFilledJobdatadb = [];
      fullFilledJobdatadb = response.data;
      var counterdb = {};
      fullFilledJobdatadb.forEach(function(obj) {
          console.log("OBJ IS" + JSON.stringify(obj));
        var key =  obj.JobTitle;
        counterdb[key] = (counterdb[key] || 0) + 1;
        var resultfullFilledJobsdb = Object.keys(counterdb).map(function(key) {
          //var key1 = key.substr(key.indexOf(" ") + 1);
          return [key, counterdb[key]];
        });
        for (var i = 0; i < resultfullFilledJobsdb.length; i++) {
          labelfullfilled[i] = resultfullFilledJobsdb[i][0];
          labelfullfilleddata[i] = resultfullFilledJobsdb[i][1];
        }
      });
      console.log("Full filled", labelfullfilled);
      console.log("Full filled data", labelfullfilleddata);
      this.setState({});
    },
    error => {
    }
  )

    // Saved Jobs
    axios.get(`${BASE_URL}/recruiter/savedjobs`,
    {
      params: {
        mail: this.props.currentUserDetails.email
      }}).then(
      response => {
          var savedJobs = [];
          savedJobs = response.data;
          var countersavedJobs = {};
          savedJobs.forEach(function(obj) {
              console.log("OBJECT IS ", obj)
            var key = obj.JobTitle;
            countersavedJobs[key] = (countersavedJobs[key] || 0) + 1;
          });
          var resultsavedJobs = Object.keys(countersavedJobs).map(function(key) {
            var key1 = key.substr(key.indexOf(" ") + 1);
            return [key1, countersavedJobs[key]];
          });
          var i;
          for (i = 0; i < resultsavedJobs.length; i++) {
            console.log("inside loop ", resultsavedJobs[0]);
            labelsavedJobs[i] = resultsavedJobs[i][0];
            labelsavedjobsdata[i] = resultsavedJobs[i][1];
          }
          console.log("labelsavedJobs", labelsavedJobs);
          console.log("labelsavedjobsdata", labelsavedjobsdata);
          this.setState({});
    },
    error => {
    }
  );


  this.setState({
    savedJobData: {
      labels: labelsavedJobs,
      datasets: [
        {
          label: "All Saved Jobs",
          data: labelsavedjobsdata,
          legendPosition : "bottom",
          backgroundColor: [
            "rgba(105, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)"
          ]
        }
      ]
    },
    userActivityData: {
      labels: labelalljobs,
      datasets: [
        {
          label: "Viewed",
          data: labeldatadb,
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(225,0,0,0.4)",
          borderColor: "red", // The main line color
          borderCapStyle: 'square',
          borderDash: [], // try [5, 15] for instance
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "black",
          pointBackgroundColor: "white",
          pointBorderWidth: 1,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: "black",
          pointHoverBorderColor: "brown",
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 10,
        },
        {
          label: "Half Filled",
          data: labelhalffilleddata,
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(225,0,0,0.4)",
          borderColor: "blue", // The main line color
          borderCapStyle: 'square',
          borderDash: [], // try [5, 15] for instance
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "black",
          pointBackgroundColor: "white",
          pointBorderWidth: 1,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: "green",
          pointHoverBorderColor: "brown",
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 10,
        },
        {
          label: "Full Filled",
          data: labelfullfilleddata,
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(225,0,0,0.4)",
          borderColor: "black", // The main line color
          borderCapStyle: 'square',
          borderDash: [], // try [5, 15] for instance
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "black",
          pointBackgroundColor: "white",
          pointBorderWidth: 1,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: "white",
          pointHoverBorderColor: "brown",
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 10,
        }
      ]
    },
    clickJobData: {
      labels: labeldb,
      datasets: [
        {
          label: "Most Clicked Jobs",
          data: labeldatadb,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)"
          ]
        }
      ]
    },
    topTenJobsData: {
      labels: labeltopjobs,
      datasets: [
        {
          label: "All Top Ten Jobs",
          data: labeltopjobsdata,
          legendPosition : "bottom",
          backgroundColor: [
            "rgba(105, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)"
          ]
        }
      ]
    },
  });

  var inCompleteForms = [
    { jobid: 1, name: "Cloud", desc: "devops", applicantid: "sojan" },
    { jobid: 1, name: "Cloud", desc: "devops", applicantid: "melvin" },
    { jobid: 1, name: "Cloud", desc: "devops", applicantid: "hari" },
    { jobid: 1, name: "Cloud", desc: "devops", applicantid: "pratik" },
    { jobid: 2, name: "DBA", desc: "sql", applicantid: "saumya" },
    { jobid: 3, name: "sq", desc: "react", applicantid: "amruta" },
    { jobid: 3, name: "sq", desc: "react", applicantid: "akhil" },
    { jobid: 2, name: "DBA", desc: "sql", applicantid: "sojan" },
    { jobid: 1, name: "Cloud", desc: "devops", applicantid: "pratik" },
    { jobid: 1, name: "Cloud", desc: "devops", applicantid: "hari" },
    {
      jobid: 4,
      name: "Software Intern",
      desc: "react",
      applicantid: "sojan"
    },
    { jobid: 4, name: "Software Intern", desc: "react", applicantid: "" },
    { jobid: 4, name: "Software Intern", desc: "react", applicantid: "hari" },
    { jobid: 2, name: "dev", desc: "sql", applicantid: "" },
    { jobid: 1, name: "sw", desc: "devops", applicantid: "hari" },
    { jobid: 1, name: "sw", desc: "devops", applicantid: "sojan" }
  ];
  var CompleteForms = [
    { jobid: 1, name: "sw", desc: "devops", applicantid: "akhil" },
    { jobid: 1, name: "sw", desc: "devops", applicantid: "saumya" },
    { jobid: 2, name: "dev", desc: "sql", applicantid: "amruta" },
    { jobid: 3, name: "sq", desc: "react", applicantid: "amruta" },
    { jobid: 2, name: "dev", desc: "sql", applicantid: "sojan" },
    { jobid: 1, name: "sw", desc: "devops", applicantid: "akhil" },
    { jobid: 1, name: "sw", desc: "devops", applicantid: "pratik" }
  ];
  var halfFilledForms = [
    { jobid: 1, name: "sw", desc: "devops", applicantid: "akhil" },
    { jobid: 1, name: "sw", desc: "devops", applicantid: "manish" },
    { jobid: 2, name: "dev", desc: "sql", applicantid: "akhil" },
    { jobid: 3, name: "sq", desc: "react", applicantid: "hari" },
    { jobid: 2, name: "dev", desc: "sql", applicantid: "manish" },
    { jobid: 1, name: "sw", desc: "devops", applicantid: "amruta" },
    { jobid: 1, name: "sw", desc: "devops", applicantid: "sojan" },
    { jobid: 2, name: "dev", desc: "sql", applicantid: "melvin" },
    { jobid: 2, name: "dev", desc: "sql", applicantid: "hari" },
    { jobid: 1, name: "sw", desc: "devops", applicantid: "sojan" },
    { jobid: 1, name: "sw", desc: "devops", applicantid: "saumya" },
    { jobid: 1, name: "sw", desc: "devops", applicantid: "melvin" },
    { jobid: 1, name: "sw", desc: "devops", applicantid: "saumya" }
  ];

  function comparer(otherArray) {
    return function(current) {
      return (
        otherArray.filter(function(other) {
          return (
            other.jobid == current.jobid &&
            other.applicantid == current.applicantid
          );
        }).length == 0
      );
    };
  }

  //  var onlyInA = a.filter(comparer(b));
  var half1 = inCompleteForms.filter(comparer(halfFilledForms));
  var halfFilledForm = halfFilledForms.filter(comparer(inCompleteForms));
  var resulthalf = half1.concat(halfFilledForm);

  console.log("reshalf", resulthalf);

}
  render() {
    if(!localStorage.getItem('servertoken'))
    {
      history.push('/')
    }
    const set1 = new Set(this.props.applicationDetails);
    var applications = Array.from(set1);
    return (
            <div>
              <Navbar />
              <div class="HeadingClass">
                <p>Dashboard</p>
               </div>
              <label className="login-label"> Job Title</label><br></br>
              <select className="title-graph" onChange={this.cityHandler}
                     name="UserType">
                      {(applications.length!=0 || applications!=null || applications.length!=undefined)?
                       applications.map((post) => {
                         console.log(post);
                              return(<option value={post.JobTitle}>  {post.JobTitle}</option>);
                            }) : <option value="No Job Posting for the recruiter"></option>
                      }

                </select>

                <div className="chart row">
                  <div className="col-md-6">
                  <div className='paddlefftt bg-light-orange dib br1 pa1 ma1 bw1 shadow-1'>

                      <div className="car-graph-3">
                      {this.parseData()}
                      {this.getAdminDashBoardGraph(this.state.map,
                      "Applications"," Top 5 job posting with less number of applications")}
                      </div>
                      <br></br>
                        {

                            this.userDetails.recruiter_title!=''? <CityApplications JobTitle = {this.userDetails.recruiter_title}/>:''
                        }
                      </div>
                      </div>
                  </div>
                  <div>

                    <Chart
                      chartData={this.state.jobData}
                      savedJobData={this.state.savedJobData}
                      clickJobData={this.state.userActivityData}
                      onlyClickedJob={this.state.clickJobData}
                      Data={this.state.jobListings}
                      topTenJobs={this.state.topTenJobsData}
                      legendPosition="bottom"
                    />
                    <br />
                    <br />
                  </div>
            </div>
           );
  }
}


function mapStateToProps(state) {
    return {
      applicationDetails : state.LoginReducer.applicationDetails,
      currentUserDetails : state.LoginReducer.currentUserDetails,
      jobTitle : state.LoginReducer.jobTitle
    };

}
function matchDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return bindActionCreators({jobtitleUpdate: jobtitleUpdate}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(RecruiterDashBoard);


/*
class RecruiterDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
      jobData: {},
      savedJobData: {},
      userActivityData: {},
      clickJobData: {},
      jobListings: {},
      topTenJobsData : []
    };
  }

  componentWillMount() {
    this.getArrayData();
  }
  componentDidMount() {

  }
  getArrayData() {
    var labeldb = [];
    var labeldatadb = [];
    var labelsavedJobs = [];
    var labelsavedjobsdata = [];
    var labelhalffilled = [];
    var labelhalffilleddata = [];
    var labelfullfilled = [];
    var labelfullfilleddata = [];
    var labeltopjobs = [];
    var labeltopjobsdata = [];
    var labelalljobs = [];
    var labelalljobsdata = [];

    const url = " http://localhost:3001/getjobs/tenjobs";
    axios.get(url,{
        params: {
          mail: this.props.user.email
        }}).then((response)=>{
          var TenJobdatadb = [];
          TenJobdatadb = response.data.joblistings;
          this.setState({jobListings : response.data.joblistings})
          var counterdb = {};
          TenJobdatadb.forEach(function(obj) {
            labeltopjobs.push(obj.JobTitle);
            labeltopjobsdata.push(obj.numberofApplicants);
          });
          console.log("label for db Ten Jobs", labeltopjobs);
          console.log("labeldata for db Ten Jobs", labeltopjobsdata);
          this.setState({});
        },
        error => {
        }
      )

      const url_2 = "http://localhost:3001/getjobs/myjobs";
    axios.get(url_2,{
        params: {
          mail: this.props.user.email
        }}).then((response)=>{
          var AllJobdatadb = [];
          AllJobdatadb = response.data.joblistings;
          this.setState({jobListings : response.data.joblistings})
          var counterdb = {};
          AllJobdatadb.forEach(function(obj) {
              console.log("--------JOB OBJ IS---------- " + JSON.stringify(obj));
            var key = obj.CompanyName + " " + obj.JobTitle;
            counterdb[key] = (counterdb[key] || 0) + 1;
            var resultAllJobsdb = Object.keys(counterdb).map(function(key) {
              var key1 = key.substr(key.indexOf(" ") + 1);
              return [key1, counterdb[key]];
            });
            for (var i = 0; i < resultAllJobsdb.length; i++) {
              labelalljobs[i] = resultAllJobsdb[i][0];
              labelalljobsdata[i] = resultAllJobsdb[i][1];
            }
          });
          console.log("label for db ALL Jobs", labelalljobs);
          console.log("labeldata for db ALL Jobs", labelalljobsdata);
          this.setState({});
        },
        error => {
        }
      )


    axios.get("http://localhost:3001/recruiter/getuserclicks",
    {
      params: {
        mail: this.props.user.first_name + " " + this.props.user.last_name
      }}).then(
        response => {
        var clickedJobdatadb = [];
        clickedJobdatadb = response.data;
        var counterdb = {};
        clickedJobdatadb.forEach(function(obj) {
            console.log("OBJ IS" + JSON.stringify(obj));
          var key = obj.Company.jobId + " " + obj.Title;
          counterdb[key] = (counterdb[key] || 0) + 1;
          var resultClickedJobsdb = Object.keys(counterdb).map(function(key) {
            var key1 = key.substr(key.indexOf(" ") + 1);
            return [key, counterdb[key]];
          });
          for (var i = 0; i < resultClickedJobsdb.length; i++) {
            labeldb[i] = resultClickedJobsdb[i][0];
            labeldatadb[i] = resultClickedJobsdb[i][1];
          }
        });
        console.log("labelk for db", labeldb);
        console.log("labeldata for db", labeldatadb);
        this.setState({});
      },
      error => {
      }
    )

    axios.get("http://localhost:3001/recruiter/halffilled",{
      params: {
        mail: this.props.user.email
      }}
    ).then(
        response => {
        var halfFilledJobdatadb = [];
        halfFilledJobdatadb = response.data;
        var counterdb = {};
        halfFilledJobdatadb.forEach(function(obj) {
            console.log("OBJ IS" + JSON.stringify(obj));
          var key = obj.JobTitle;
          counterdb[key] = (counterdb[key] || 0) + 1;
          var resulthalfFilledJobsdb = Object.keys(counterdb).map(function(key) {
           // var key = key.substr(key.indexOf(" ") + 1);
            return [key, counterdb[key]];
          });
          for (var i = 0; i < resulthalfFilledJobsdb.length; i++) {
            labelhalffilled[i] = resulthalfFilledJobsdb[i][0];
            labelhalffilleddata[i] = resulthalfFilledJobsdb[i][1];
          }
        });
        console.log("HALF FILLED label for db", labelhalffilled);
        console.log("HALF FILLED labeldata for db", labelhalffilleddata);
        this.setState({});
      },
      error => {
      }
    )

    axios.get("http://localhost:3001/recruiter/fullfilled",{
      params: {
        mail: this.props.user.email
      }}).then(
        response => {
        var fullFilledJobdatadb = [];
        fullFilledJobdatadb = response.data;
        var counterdb = {};
        fullFilledJobdatadb.forEach(function(obj) {
            console.log("OBJ IS" + JSON.stringify(obj));
          var key =  obj.JobTitle;
          counterdb[key] = (counterdb[key] || 0) + 1;
          var resultfullFilledJobsdb = Object.keys(counterdb).map(function(key) {
            //var key1 = key.substr(key.indexOf(" ") + 1);
            return [key, counterdb[key]];
          });
          for (var i = 0; i < resultfullFilledJobsdb.length; i++) {
            labelfullfilled[i] = resultfullFilledJobsdb[i][0];
            labelfullfilleddata[i] = resultfullFilledJobsdb[i][1];
          }
        });
        console.log("Full filled", labelfullfilled);
        console.log("Full filled data", labelfullfilleddata);
        this.setState({});
      },
      error => {
      }
    )

      // Saved Jobs
      axios.get("http://localhost:3001/recruiter/savedjobs",
      {
        params: {
          mail: this.props.user.email
        }}).then(
        response => {
            var savedJobs = [];
            savedJobs = response.data;
            var countersavedJobs = {};
            savedJobs.forEach(function(obj) {
                console.log("OBJECT IS ", obj)
              var key = obj.JobTitle;
              countersavedJobs[key] = (countersavedJobs[key] || 0) + 1;
            });
            var resultsavedJobs = Object.keys(countersavedJobs).map(function(key) {
              var key1 = key.substr(key.indexOf(" ") + 1);
              return [key1, countersavedJobs[key]];
            });
            var i;
            for (i = 0; i < resultsavedJobs.length; i++) {
              console.log("inside loop ", resultsavedJobs[0]);
              labelsavedJobs[i] = resultsavedJobs[i][0];
              labelsavedjobsdata[i] = resultsavedJobs[i][1];
            }
            console.log("labelsavedJobs", labelsavedJobs);
            console.log("labelsavedjobsdata", labelsavedjobsdata);
            this.setState({});
      },
      error => {
      }
    );


    this.setState({
      savedJobData: {
        labels: labelsavedJobs,
        datasets: [
          {
            label: "All Saved Jobs",
            data: labelsavedjobsdata,
            legendPosition : "bottom",
            backgroundColor: [
              "rgba(105, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 99, 132, 0.6)"
            ]
          }
        ]
      },
      userActivityData: {
        labels: labelalljobs,
        datasets: [
          {
            label: "Viewed",
            data: labeldatadb,
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(225,0,0,0.4)",
            borderColor: "red", // The main line color
            borderCapStyle: 'square',
            borderDash: [], // try [5, 15] for instance
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "black",
            pointBackgroundColor: "white",
            pointBorderWidth: 1,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "black",
            pointHoverBorderColor: "brown",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
          },
          {
            label: "Half Filled",
            data: labelhalffilleddata,
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(225,0,0,0.4)",
            borderColor: "blue", // The main line color
            borderCapStyle: 'square',
            borderDash: [], // try [5, 15] for instance
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "black",
            pointBackgroundColor: "white",
            pointBorderWidth: 1,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "green",
            pointHoverBorderColor: "brown",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
          },
          {
            label: "Full Filled",
            data: labelfullfilleddata,
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(225,0,0,0.4)",
            borderColor: "black", // The main line color
            borderCapStyle: 'square',
            borderDash: [], // try [5, 15] for instance
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "black",
            pointBackgroundColor: "white",
            pointBorderWidth: 1,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "white",
            pointHoverBorderColor: "brown",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
          }
        ]
      },
      clickJobData: {
        labels: labeldb,
        datasets: [
          {
            label: "Most Clicked Jobs",
            data: labeldatadb,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 99, 132, 0.6)"
            ]
          }
        ]
      },
      topTenJobsData: {
        labels: labeltopjobs,
        datasets: [
          {
            label: "All Top Ten Jobs",
            data: labeltopjobsdata,
            legendPosition : "bottom",
            backgroundColor: [
              "rgba(105, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 99, 132, 0.6)"
            ]
          }
        ]
      },
    });

    var inCompleteForms = [
      { jobid: 1, name: "Cloud", desc: "devops", applicantid: "sojan" },
      { jobid: 1, name: "Cloud", desc: "devops", applicantid: "melvin" },
      { jobid: 1, name: "Cloud", desc: "devops", applicantid: "hari" },
      { jobid: 1, name: "Cloud", desc: "devops", applicantid: "pratik" },
      { jobid: 2, name: "DBA", desc: "sql", applicantid: "saumya" },
      { jobid: 3, name: "sq", desc: "react", applicantid: "amruta" },
      { jobid: 3, name: "sq", desc: "react", applicantid: "akhil" },
      { jobid: 2, name: "DBA", desc: "sql", applicantid: "sojan" },
      { jobid: 1, name: "Cloud", desc: "devops", applicantid: "pratik" },
      { jobid: 1, name: "Cloud", desc: "devops", applicantid: "hari" },
      {
        jobid: 4,
        name: "Software Intern",
        desc: "react",
        applicantid: "sojan"
      },
      { jobid: 4, name: "Software Intern", desc: "react", applicantid: "" },
      { jobid: 4, name: "Software Intern", desc: "react", applicantid: "hari" },
      { jobid: 2, name: "dev", desc: "sql", applicantid: "" },
      { jobid: 1, name: "sw", desc: "devops", applicantid: "hari" },
      { jobid: 1, name: "sw", desc: "devops", applicantid: "sojan" }
    ];
    var CompleteForms = [
      { jobid: 1, name: "sw", desc: "devops", applicantid: "akhil" },
      { jobid: 1, name: "sw", desc: "devops", applicantid: "saumya" },
      { jobid: 2, name: "dev", desc: "sql", applicantid: "amruta" },
      { jobid: 3, name: "sq", desc: "react", applicantid: "amruta" },
      { jobid: 2, name: "dev", desc: "sql", applicantid: "sojan" },
      { jobid: 1, name: "sw", desc: "devops", applicantid: "akhil" },
      { jobid: 1, name: "sw", desc: "devops", applicantid: "pratik" }
    ];
    var halfFilledForms = [
      { jobid: 1, name: "sw", desc: "devops", applicantid: "akhil" },
      { jobid: 1, name: "sw", desc: "devops", applicantid: "manish" },
      { jobid: 2, name: "dev", desc: "sql", applicantid: "akhil" },
      { jobid: 3, name: "sq", desc: "react", applicantid: "hari" },
      { jobid: 2, name: "dev", desc: "sql", applicantid: "manish" },
      { jobid: 1, name: "sw", desc: "devops", applicantid: "amruta" },
      { jobid: 1, name: "sw", desc: "devops", applicantid: "sojan" },
      { jobid: 2, name: "dev", desc: "sql", applicantid: "melvin" },
      { jobid: 2, name: "dev", desc: "sql", applicantid: "hari" },
      { jobid: 1, name: "sw", desc: "devops", applicantid: "sojan" },
      { jobid: 1, name: "sw", desc: "devops", applicantid: "saumya" },
      { jobid: 1, name: "sw", desc: "devops", applicantid: "melvin" },
      { jobid: 1, name: "sw", desc: "devops", applicantid: "saumya" }
    ];

    function comparer(otherArray) {
      return function(current) {
        return (
          otherArray.filter(function(other) {
            return (
              other.jobid == current.jobid &&
              other.applicantid == current.applicantid
            );
          }).length == 0
        );
      };
    }

    //  var onlyInA = a.filter(comparer(b));
    var half1 = inCompleteForms.filter(comparer(halfFilledForms));
    var halfFilledForm = halfFilledForms.filter(comparer(inCompleteForms));
    var resulthalf = half1.concat(halfFilledForm);

    console.log("reshalf", resulthalf);

  }

  GenerateGraph = () =>
  {
    console.log("REC NAME : ")
  }


  render() {
    console.log("chart", this.state.chartData);
    console.log("jobdata", this.state.jobData);
    console.log("savedJobData", this.state.savedJobData);
    console.log("clickJobData", this.state.userActivityData);

  //   let JobButtons = null;

  //   if(this.state.joblist!=0)
  //   {
  //     console.log("LENGTH - " , this.state.jobListings.length)
  //    JobButtons = (this.state.jobListings.map(function (item, index) {
  //     console.log("ITEM IS")
  // }));
  //   }

    return (
      <div>
          <div class="HeadingClass">
            <p>Dashboard</p>
           </div>
        <Chart
          chartData={this.state.jobData}
          savedJobData={this.state.savedJobData}
          clickJobData={this.state.userActivityData}
          onlyClickedJob={this.state.clickJobData}
          Data={this.state.jobListings}
          topTenJobs={this.state.topTenJobsData}
          legendPosition="bottom"
        />
        <br />
        <br />
      </div>
    );
  }
}
const mapStateToProps = (state) =>{
  return {
      user : state.LoginReducer.currentUserDetails,
  }
}

export default connect(mapStateToProps,null)(RecruiterDashboard);
*/
