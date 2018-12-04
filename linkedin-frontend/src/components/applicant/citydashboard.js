import React,{ Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import BarChart from './../graph/barchart';
import LineChart from './../graph/line_chart';
import './applicantprofile.css';


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

class CityDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      map1:'',
      labels:[]
    }
    this.parseData = this.parseData.bind(this);
    this.chartData = this.chartData.bind(this);
  }
parseData() {
    var graphData = new Array();
    this.state.map1 = new Map();
    var count=1;
    for(var i = 0 ; i< this.props.applicationDetails.length ; i++) {
        var mapkey = this.props.applicationDetails[i].JobTitle+" city "+this.props.applicationDetails[i].JobLocation;
        alert(mapkey);
        if(this.state.map1.has(mapkey)) {
          count = this.state.map1.get(mapkey);
          count++;
        }
        else {
          count=1;
        }
        this.state.map1.set(mapkey,count);
      }

      for (let [key, value] of this.state.map1) {
          console.log(key + ' ' + value);
          var labelsvalue = key.split('city');
          this.state.labels.push(labelsvalue[0].trim());
      }
      for (var i = 0 ; i < this.state.labels.length; i++) {
          console.log(this.state.labels[i]);
      }
  }

  getAdminDashBoardGraph(map,label_name, header_text){
    var labels = new Array();
    var datasets = new Array();
    var count=1;
    for(let [key, value] of this.state.map1) {
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
      return (<LineChart data={data}/>)
    }else{
      return (<h2 style={{color:"red"}}> Analysis data not available </h2>)
    }
}
  render() {
    return (
      <div>
          <div className="header-graph1">
          <div className="graph-display">
            <div className='bg-light-orange dib br1 pa1 ma1 bw1 shadow-1'>

                <div className="car-graph-4">
                {this.parseData()}
                {this.getAdminDashBoardGraph(this.state.map1,
                "Applications"," Top 5 job posting with less number of applications")}
                </div>
                <br></br>
            </div>
          </div>
          </div>
      </div>
    )
  }
  chartData() {
      return {

        labels: this.state.labels,
        datasets: [
          {
            label: 'San Jose',
            lineTension: 0.1,
            backgroundColor: 'rgba(0, 177, 228,0.7)',
            borderColor: 'rgba(0, 177, 228,0.7)', // The main line color
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
            datasetFill: false,
            pointHitRadius: 10,
            datasetStroke: false,
            fill: false,
            data: [5, 9, 8, 1, 6, 5, 4],
          },
          {
            label: 'San Fransisco',
            lineTension: 0.1,
            backgroundColor: 'rgba(0, 177, 228,0.7)',
            borderColor: 'rgba(255, 99, 132, 0.6)', // The main line color
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
            datasetFill: false,
            fill: false,
            datasetStroke: false,
            data: [2, 8, 0, 1, 8, 7, 9],
          },
        ]
      }
    }
}
function mapStateToProps(state) {
    return {
      applicationDetails : state.LoginReducer.applicationDetails,
      currentUserDetails : state.LoginReducer.currentUserDetails
    };

}

export default connect(mapStateToProps,null)(CityDashboard);
