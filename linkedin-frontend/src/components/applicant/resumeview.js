import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {history} from "../../util/utils";
class ResumeView extends Component {

    constructor(props){
        super(props)
        this.state = {
            fileName : this.props.currentUserDetails.resume_path[0],
            numPages: null,
            pageNumber: 1
        }
        this.onDocumentLoad = this.onDocumentLoad.bind(this);

    }

    componentDidMount(){
        console.log(this.props.currentUserDetails.resume_path[0]);
    }


        onDocumentLoad = ({ numPages }) => {
            this.setState({ numPages });
          }

    render() {
      if(!localStorage.getItem('servertoken'))
      {
        history.push('/')
      }

        const {fileName,pageNumber,numPages} = this.state;
        const fileURL = this.props.currentUserDetails.resume_path[0];
        return (

        <div>
            <Document
          file={this.props.currentUserDetails.resume_path[0]}
          onLoadSuccess={this.onDocumentLoad}
        >
        {
          Array.apply(null, {length: numPages}).map(Number.call, Number).map(page => (
            <Page pageNumber={page} />
        ))}
  }
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
        <button onClick ={() => {history.push('./userprofile')}} className="btn btn-primary bookingsuccess1"><strong>Return to User Profile</strong></button>
        </div>
         );
    }
}

function mapStateToProps(state) {
  console.log("State",state);
    return {
       currentUser: state.LoginReducer.current_user,
       currentUserDetails: state.LoginReducer.currentUserDetails
    };
}


export default connect(mapStateToProps,null)(ResumeView);
