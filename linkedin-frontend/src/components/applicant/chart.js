import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";



class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData,
      savedJobData: props.savedJobData,
      clickJobData: props.clickJobData,
      appliedJobData : props.appliedJobData,
      onlyClickedJob : props.onlyClickedJob,
      options : null,
      data : null,
      topTenJobs : props.topTenJobs
    };
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "bottom",
    location: "City"
  };


  render() {
    return (
      <div className="chart row">
        <div className="col-md-6">
          <Line
            data={this.state.clickJobData}
            options={{
              title: {
                display: this.props.displayTitle,
                text: "User Activity", // + this.props.location,
                fontSize: 25
              },
              legend: {
                display: this.props.displayLegend,
                position: this.props.legendPosition
              }
            }}
          />
        </div>
        <div className="col-md-6">
          <Bar
            data={this.state.savedJobData}
            options={{
              title: {
                display: this.props.displayTitle,
                text: "Saved Jobs ", //+ this.props.location,
                fontSize: 25
              },
              legend: {
                display: this.props.displayLegend,
                position: this.props.legendPosition
              }
            }}
          />
        </div>
        <div className="col-md-6">
        <Line
            data={this.state.onlyClickedJob}
            options={{
              title: {
                display: this.props.displayTitle,
                text: "Clicks per Job Posting", // + this.props.location,
                fontSize: 25
              },
              legend: {
                display: this.props.displayLegend,
                position: this.props.legendPosition
              }
            }}
          />
        </div>
        <div className="col-md-6">
         <Bar
           data={this.state.topTenJobs}
           options={{
             title: {
               display: this.props.displayTitle,
               text: "Top Jobs ", //+ this.props.location,
               fontSize: 25
             },
             legend: {
               display: this.props.displayLegend,
               position: this.props.legendPosition
             }
           }}
         />
       </div>
       </div>
    );
  }
}

export default Chart;
