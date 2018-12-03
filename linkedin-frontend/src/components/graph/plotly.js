import React,{ Component } from 'react';
import createPlotlyComponent from 'react-plotlyjs';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//See the list of possible plotly bundles at https://github.com/plotly/plotly.js/blob/master/dist/README.md#partial-bundles or roll your own
import Plotly from 'plotly.js-cartesian-dist';
const PlotlyComponent = createPlotlyComponent(Plotly);

class PlotylyGraph extends Component {
render() {
  let data = [
    {
      type: 'scatter',
      title : 'Surabhi',  // all "scatter" attributes: https://plot.ly/javascript/reference/#scatter
      x: [1, 2, 3],     // more about "x": #scatter-x
      y: [6, 2, 3],     // #scatter-y
      marker: {         // marker is an object, valid marker keys: #scatter-marker
        color: 'rgb(16, 32, 77)',
        label : 'surabhi',
        name: 'scatter chart example'

      }
    },
  ];
  let layout = {                     // all "layout" attributes: #layout
    title: 'simple example',  // more about "layout.title": #layout-title
    xaxis: {                  // all "layout.xaxis" attributes: #layout-xaxis
      title: 'time'         // more about "layout.xaxis.title": #layout-xaxis-title
    },
    annotations: [            // all "annotation" attributes: #layout-annotations
      {
        text: 'simple annotation',    // #layout-annotations-text
        x: 0,                         // #layout-annotations-x
        xref: 'paper',                // #layout-annotations-xref
        y: 0,                         // #layout-annotations-y
        yref: 'paper'                 // #layout-annotations-yref
      }
    ]
  };
  let config = {
    showLink: false,
    displayModeBar: true
  };
  return (
    <PlotlyComponent className="whatever" data={data} layout={layout} config={config}/>
  );
}
}

function mapStateToProps(state) {
  console.log("State",state);
    return {
       currentUser: state.LoginReducer.current_user,
       currentUserDetails: state.LoginReducer.currentUserDetails,
       userProfileDetails: state.LoginReducer.userProfileDetails
    };
}
//
// function matchDispatchToProps(dispatch){
//   console.log("Dispatch",dispatch);
//   return bindActionCreators({profileUpdate: profileUpdate, graphUpdate : graphUpdate}, dispatch);
// }

export default connect(mapStateToProps,null)(PlotylyGraph);
