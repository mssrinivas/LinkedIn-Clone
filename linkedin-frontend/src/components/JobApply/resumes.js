import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import {BASE_URL} from './../constants/constants.js';
import {history} from "../../util/utils";
class resumes extends Component {

constructor(props){
        super(props)
        this.state = {
            fileName : this.props.match.params.filename,
            userid:this.props.match.params.userid,
            numPages: null,
            pageNumber: 1
        }
        this.onDocumentLoad = this.onDocumentLoad.bind(this);

    }

    componentDidMount(){
        console.log("FILENAME" , this.state.fileName);
        console.log(this.state.userid);
    }


        onDocumentLoad = ({ numPages }) => {
            this.setState({ numPages });
          }

    render() {
      if(!localStorage.getItem('servertoken'))
      {
        history.push('/')
      }
        const {fileName,userid,pageNumber,numPages} = this.state;
        const fileURL = BASE_URL+"/resumeFolder/"+userid+"/"+fileName;
        return (

        <div>
            <Document
          file={fileURL}
          onLoadSuccess={this.onDocumentLoad}
        >
        {/* {
          Array.apply(null, {length: numPages}).map(Number.call, Number).map(page => ( }
            <Page pageNumber={page} />
          ))}*/}
        <Page pageNumber={1} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
        </div>
         );
    }
}

export default resumes;
