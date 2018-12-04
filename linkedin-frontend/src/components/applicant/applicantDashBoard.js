import React,{ Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './applicantprofile.css';
import LineChart from './../graph/line_chart';
import Navbar from './../navbar/Navbar.jsx';
import {userSearch} from './../../api/Api';
import {recuriterDashBoardSearch} from './../../api/Api';
import {history} from "../../util/utils";

class ApplicantDashBoard extends Component {
  constructor(props) {
    super(props);
    this.state={
      map:''
    }
    this.userDetails={};
    this.userAnalysisData = {
      date:['23rd Nov','22nd Nov','21st Nov','20th Nov','19th Nov','18th Nov','17th Nov'],
      count: ['6','5','4','7','8','3','2']
    }
    this.clickSearch=this.clickSearch.bind(this);
  }
  parseMonth(data) {
    switch (data) {
        case '1':
          return 'Jan';
          break;
        case '2':
          return 'Feb';
          break;
        case '3':
          return 'Mar';
          break;
        case '4':
          return 'Apr';
          break;
        case '5':
          return 'May';
          break;
        case '6':
          return 'Jun';
          break;
        case '7':
          return 'Jul';
          break;
        case '8':
            return 'Aug';
            break;
        case '9':
            return 'Sep';
            break;
        case '10':
            return 'Oct';
            break;
        case '11':
            return 'Nov';
            break;
        case '12':
            return 'Dec';
            break;
        default:
          alert("Wrong date entered")
        }
  }
  parseData() {
      var graphData = new Array();
      var graphData1 = this.props.userTraceActivity;
      for(var i = 0 ; i< graphData1.length ; i++) {
        var currentDate = graphData1[i].timestamp;
        var month = currentDate.split('-')[1];
        var monthString= this.parseMonth(month);
        var data = {};
        var myDate=currentDate.split('-')[2].split('T')[0];
        data.date=monthString+' ' +myDate;
        data.applicant_id=graphData1[i].applicant_id;
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
    for(const m of this.state.map.entries()) {
      var val = m.toString();
      labels.push(val.split(',')[0]);
      datasets.push(val.split(',')[1])
    }
    if(map.size >0){
        var data={
          labels: labels,
          datasets:datasets,
          labelName:label_name,
          header_text:header_text
         }
      return (<LineChart data={data}/>)
    }else{
      return (<h2 style={{color:"red"}}> Analysis data not available </h2>)
    }
}

clickSearch =(e) => {
  e.preventDefault();
  this.userDetails.RecruiterEmail = this.props.currentUserDetails.email;
  this.props.recuriterDashBoardSearch(this.userDetails);
}
  render() {
    if(!localStorage.getItem('servertoken'))
    {
      history.push('/')
    }
    return (
            <div>
              <Navbar />
                <div className="header-graph">
                <h5 > Who viewed your profile </h5>
                <div className="graph-display">
                  <div className='bg-light-orange dib br1 pa1 ma1 bw1 shadow-1'>
                      <h5 className="profile-visitors"> {this.props.userTraceActivity.length }  profile viewers in the past 30 days</h5>
                      <div className="car-graph-3">
                      {this.parseData()}
                      {this.getAdminDashBoardGraph(this.state.map,
                      "User Views"," User Profile views for last one month")}
                      </div>
                      <button onClick ={() => {history.push('./userprofile')}} className="btn btn-primary bookingsuccess1"><strong>Return to User Profile</strong></button>

                  </div>
                </div>
                </div>
            </div>
           );
  }
}


function mapStateToProps(state) {
    return {
        userTraceActivity: state.LoginReducer.userTraceActivity,
        currentUserDetails : state.LoginReducer.currentUserDetails
    };

}
function matchDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return bindActionCreators({userSearch: userSearch, recuriterDashBoardSearch: recuriterDashBoardSearch}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(ApplicantDashBoard);
