import React,{ Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import BarChart from './../graph/barchart';
import LineChart from './../graph/line_chart';
import PieChart from './../graph/pie_chart';
import './applicantprofile.css';
import {history} from "../../util/utils";

// const options = {
//   scaleShowGridLines: false,
//   // scaleGridLineColor: 'rgba(0, 177, 228,0.7)',
//   scaleGridLineWidth: 1,
//   scaleShowHorizontalLines: false,
//   scaleShowVerticalLines: false,
//   bezierCurve: false,
//   bezierCurveTension: 0.4,
//   pointDot: false,
//   pointDotRadius: 4,
//   pointDotStrokeWidth: 1,
//   pointHitDetectionRadius: 20,
//   datasetStroke: false,
//   datasetStrokeWidth: 2,
//   datasetFill: false,
//   legendTemplate: '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
// }

const styles = {
  graphContainer: {
    border: '1px solid white',
    padding: '15px'
  }
}

class LineChartExample extends Component {
  constructor(props) {
    super(props)
    this.state = {
      map1:'',
      labels:[],
      JobTitle:''
    }
    this.parseData = this.parseData.bind(this);
  }
parseData() {
    var graphData = new Array();
    this.state.map1 = new Map();
    var count=1;
    for(var i = 0 ; i< this.props.applicationDetails.length ; i++) {
        if(this.props.applicationDetails[i].JobTitle == this.props.jobTitle) {
          var mapkey = this.props.applicationDetails[i].JobLocation;
              if(this.state.map1.has(mapkey)) {
                count = this.state.map1.get(mapkey);
                count++;
              }
              else {
                count=1;
              }
              this.state.map1.set(mapkey,count);
        }
      }

      for (let [key, value] of this.state.map1) {
          console.log(key + ' ' + value);
      }
  }

  getAdminDashBoardGraph(map,label_name, header_text){
    var labels = new Array();
    var datasets = new Array();
    var count=1;
    for(let [key, value] of this.state.map1) {
      labels.push(key);
      datasets.push(value);
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
    if(!localStorage.getItem('servertoken'))
    {
      history.push('/')
    }
    return (
      <div>
          <div className="header-graph1">
          <div className="graph-display">
            <div className='bg-light-orange dib br1 pa1 ma1 bw1 shadow-1'>

                <div className="car-graph-4">
                {this.parseData()}
                {this.getAdminDashBoardGraph(this.state.map1,
                "Applications"," City Wise Applications for Job")}
                </div>
                <br></br>
            </div>
          </div>
          </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
    return {
      applicationDetails : state.LoginReducer.applicationDetails,
      currentUserDetails : state.LoginReducer.currentUserDetails,
      jobTitle : state.LoginReducer.jobTitle
    };

}

export default connect(mapStateToProps,null)(LineChartExample);
