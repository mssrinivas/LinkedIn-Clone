import React,{ Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './applicantprofile.css';
import LineChart from './../graph/line_chart';
import BarChart from './../graph/barchart';
import Navbar from './../navbar/Navbar.jsx';
import {userSearch} from './../../api/Api';
import LineChartExample from './linechartexample';

class RecruiterDashBoard extends Component {
  constructor(props) {
    super(props);
    this.state={
      map:''
    }
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
    for (let [key, value] of this.state.map) {
        console.log(key + ' ' + value);
    }
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

  render() {
    return (
            <div>
              <Navbar />
                <div className="header-graph">
                <div className="graph-display">
                  <div className='bg-light-orange dib br1 pa1 ma1 bw1 shadow-1'>

                      <div className="car-graph-3">
                      {this.parseData()}
                      {this.getAdminDashBoardGraph(this.state.map,
                      "Applications"," Top 5 job posting with less number of applications")}
                      </div>
                      <br></br>
                      <LineChartExample/>
                  </div>
                </div>
                </div>
            </div>
           );
  }
}


function mapStateToProps(state) {
    return {
      applicationDetails : state.LoginReducer.applicationDetails,
      currentUserDetails : state.LoginReducer.currentUserDetails
    };

}
// function matchDispatchToProps(dispatch){
//     console.log("Dispatch",dispatch);
//     return bindActionCreators({userSearch: userSearch}, dispatch);
// }

export default connect(mapStateToProps,null)(RecruiterDashBoard);
