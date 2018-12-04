import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import './../applicant/applicantprofile.css';

class LineChart extends Component{
  constructor(){
    super();
    this.chartColor = [
      'rgba(0, 177, 228,0.7)',
    ];
  }

  createLineChartData(data){
    console.log("data :",data);
    var data = {
      labels: data.labels,
      datasets:[
        {
          label:data.labelName,
          data:data.datasets,
          backgroundColor:this.chartColor,
          fill: false,
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
            pointHitRadius: 10,
        }
      ]
    }
    return data;
  }
  render(){
    return (
      <div className="chart">
        <Line
          data={this.createLineChartData(this.props.data)}
          options={{
            title:{
              display:true,
              text:this.props.data.header_text,
              fontSize:25
            },
            legend:{
              display:true,
              position:"right"
            }
          }}
        />
        </div>
    )
  }
}

export default LineChart;
