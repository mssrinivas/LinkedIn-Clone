import React, { Component } from "react";
import Chart from "./Chart";
import axios from "axios";
import './RecruiterDashboard.css'
class RecruiterDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
      jobData: {},
      savedJobData: {},
      userActivityData: {},
      clickJobData: {},
      jobListings: [],
      topTenJobsData : {}
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

    const url = " http://localhost:3001/getjobs/tenjobs";
    axios.get(url,{
        params: {
          mail: 'recruiter@gmail.com'
        }}).then((response)=>{
          var TenJobdatadb = [];
          TenJobdatadb = response.data.joblistings;
          this.setState({jobListings : response.data.joblistings})
          var counterdb = {};
          TenJobdatadb.forEach(function(obj) {
              console.log("OBJ IS" + JSON.stringify(obj));
            var key = obj.CompanyName + " " + obj.jobTitle;
            counterdb[key] = (counterdb[key] || 0) + 1;
            var resultTenJobsdb = Object.keys(counterdb).map(function(key) {
              var key1 = key.substr(key.indexOf(" ") + 1);
              return [key1, counterdb[key]];
            });
            for (var i = 0; i < resultTenJobsdb.length; i++) {
              labeltopjobs[i] = resultTenJobsdb[i][0];
              labeltopjobsdata[i] = resultTenJobsdb[i][1];
            }
          });
          console.log("labelk for db", labeltopjobs);
          console.log("labeldata for db", labeltopjobsdata);
          this.setState({});
        },
        error => {
        }
      )
    

    axios.get("http://localhost:3001/recruiter/getuserclicks").then(
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
            return [key1, counterdb[key]];
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

    // axios.get("http://localhost:3001/recruiter/halffilled").then(
    //     response => {
    //     var halfFilledJobdatadb = [];
    //     halfFilledJobdatadb = response.data;
    //     var counterdb = {};
    //     halfFilledJobdatadb.forEach(function(obj) {
    //         console.log("OBJ IS" + JSON.stringify(obj));
    //       var key = obj.Company.jobId + " " + obj.Title;
    //       counterdb[key] = (counterdb[key] || 0) + 1;
    //       var resulthalfFilledJobsdb = Object.keys(counterdb).map(function(key) {
    //         var key1 = key.substr(key.indexOf(" ") + 1);
    //         return [key1, counterdb[key]];
    //       });
    //       for (var i = 0; i < resulthalfFilledJobsdb.length; i++) {
    //         labelhalffilled[i] = resulthalfFilledJobsdb[i][0];
    //         labelhalffilleddata[i] = resulthalfFilledJobsdb[i][1];
    //       }
    //     });
    //     console.log("labelk for db", labelhalffilled);
    //     console.log("labeldata for db", labelhalffilleddata);
    //     this.setState({});
    //   },
    //   error => {
    //   }
    // )

    axios.get("http://localhost:3001/recruiter/fullfilled").then(
        response => {
        var fullFilledJobdatadb = [];
        fullFilledJobdatadb = response.data;
        var counterdb = {};
        fullFilledJobdatadb.forEach(function(obj) {
            console.log("OBJ IS" + JSON.stringify(obj));
          var key =  obj.JobTitle;
          counterdb[key] = (counterdb[key] || 0) + 1;
          var resultfullFilledJobsdb = Object.keys(counterdb).map(function(key) {
            var key1 = key.substr(key.indexOf(" ") + 1);
            return [key1, counterdb[key]];
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
      axios.get("http://localhost:3001/recruiter/savedjobs").then(
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
        labels: labelfullfilled,
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
            data:[1,2,3,4],
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

    let JobButtons = null;

    if(this.state.joblist!=0)
    {
      console.log("LENGTH - " , this.state.jobListings.length)
     JobButtons = (this.state.jobListings.map(function (item, index) {
      console.log("ITEM IS")
  }));
    }

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
        {JobButtons}
      </div>
    );
  }
}

export default RecruiterDashboard;

