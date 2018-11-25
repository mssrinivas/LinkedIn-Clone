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
          backgroundColor:this.chartColor
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
