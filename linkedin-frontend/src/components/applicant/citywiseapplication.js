
import React,{ Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './applicantprofile.css';
import LineChart from './../graph/line_chart';
import Navbar from './../navbar/Navbar.jsx';
import {userSearch} from './../../api/Api';
import HeatMap from 'react-heatmap-grid';

class CityApplications extends Component {
  constructor(props) {
    super(props);
    this.state={
      map:''
    }
    this.xLabels=[];
    this.yLabels=[];
    this.data1=[];
    this.parseData=this.parseData.bind(this);
    this.getAdminDashBoardGraph=this.getAdminDashBoardGraph.bind(this);
    this.userAnalysisData = {
      date:['23rd Nov','22nd Nov','21st Nov','20th Nov','19th Nov','18th Nov','17th Nov'],
      count: ['6','5','4','7','8','3','2']
    }
    this.graphData1 = [{
     Job_id: "12345",
     JobTitle : "Software Programmer",
     Applicant_id: "123",
     City: "San Jose"
 },
{
     Job_id: "12345",
     JobTitle : "Software Designer",
     Applicant_id: "123",
     City: "San Jose"
},
{
     Job_id:"123456",
     JobTitle : "Software Tester",
     Applicant_id: "123",
     City: "San Fransisco"
},
{
   Job_id: "123456",
   JobTitle : "Team Lead",
   Applicant_id: "123",
   City: "Fremont"
},
{
   Job_id: "123456",
   JobTitle : "Team Architect",
   Applicant_id: "1234",
   City: "San Jose"
},
{
   Job_id:"123456",
   JobTitle : "Solution Architect",
   Applicant_id: "12345",
   City: "San Jose"
},
{
 Job_id:"123457",
 JobTitle: "Analyst",
 Applicant_id: "123456",
 City: "San Fransisco"
},
{
 Job_id:"123457",
 JobTitle: "Techonology Analyst",
 Applicant_id: "123456",
 City: "San Fransisco"
},
{
 Job_id:"123457",
 JobTitle: "Consultant",
 Applicant_id: "123456",
 City: "Fremont"
},
{
 Job_id:"123457",
 JobTitle: "Product Designer",
 Applicant_id: "123456",
 City: "Fremont"
},
{
 Job_id:"1234578",
 JobTitle: "Test Engineer",
 Applicant_id: "12340",
 City: "Fremont"
},
{
 Job_id:"1234578",
 JobTitle: "Test Engineer",
 Applicant_id: "123458",
 City: "Fremont"
},
{
 Job_id:"123459",
 JobTitle: "Product Manager",
 Applicant_id: "123456",
 City: "Fremont"
},
{
 Job_id:"123459",
 JobTitle: "Manager",
 Applicant_id: "123456",
 City: "San Jose"
},
{
 Job_id:"123459",
 JobTitle: "Manager",
 Applicant_id: "123456",
 City: "San Jose"
},
];
}
  parseData() {
      var graphData = new Array();
      for(var i = 0 ; i< this.graphData1.length ; i++) {
        var currentDate = this.graphData1[i].JobTitle;
        // var month = currentDate.split('-')[1];
        // var monthString= this.parseMonth(month);
        var data = {};
        // var myDate=currentDate.split('-')[2].split('T')[0];
        data.date=currentDate;
        data.City=this.graphData1[i].City;
        data.applicant_id=this.graphData1[i].applicant_id;
        graphData.push(data);

      }
    this.state.map = new Map();
    var count=1;
    var value={};
    for(var i = 0 ; i < graphData.length;i++) {
        if(this.state.map.has(graphData[i].date)) {
            if(this.state.map.get(graphData[i].date).city == graphData[i].City) {
              count = this.state.map.get(graphData[i].date).count;
              count++;
              value.count=count;
              value.city=graphData[i].City;
            }
            else {
              count=1;
              value.count=count;
              value.city=graphData[i].City;
            }
        }
        else {
          count=1;
          value.count=count;
          value.city=graphData[i].City;
        }

        this.state.map.set(graphData[i].date,value);
    }
  }
  getAdminDashBoardGraph(map,label_name, header_text){
    var labels = new Array();
    var datasets = new Array();
    for(const m of this.state.map.entries()) {
      var val = m.toString();
      // alert(this.state.map.get(val.split(',')[0]).city);
      // alert(val.split(',')[1].value);
      this.xLabels.push(val.split(',')[0]);
      this.yLabels.push(this.state.map.get(val.split(',')[0]).city);
      this.data1.push(this.state.map.get(val.split(',')[0]).count);

      // this.yLabels.push(val.split(',')[1].city);
      // this.data.push(val.split(',')[1].count);
      // labels.push(val.split(',')[0]);
      // datasets.push(val.split(',')[1])
    }
      alert(this.data1.length);

    if(map.size >0){
        var data={
          labels: this.xlabels,
          datasets:this.data1,
          labelName:label_name,
          header_text:header_text
         }
      return (<LineChart data={data}/>)
    }else{
      return (<h2 style={{color:"red"}}> Analysis data not available </h2>)
    }
}


  render() {
    return (
            <div>
              <Navbar />
              <div className="header-graph">
              <h5 > Who viewed your profile </h5>
              <div className="graph-display">
                <div className='bg-light-orange dib br1 pa1 ma1 bw1 shadow-1'>
                    <h5 className="profile-visitors">  profile viewers in the past 30 days</h5>
                    <div className="car-graph-3">
                    {this.parseData()}
                    {this.getAdminDashBoardGraph(this.state.map,
                    "User Views"," User Profile views for last one month")}
                    </div>

                </div>
              </div>
              </div>
            </div>
           );
  }
}


// function mapStateToProps(state) {
//     return {
//         userTraceActivity: state.LoginReducer.userTraceActivity,
//     };
//
// }
// function matchDispatchToProps(dispatch){
//     console.log("Dispatch",dispatch);
//     return bindActionCreators({userSearch: userSearch}, dispatch);
// }

export default connect(null,null)(CityApplications);
