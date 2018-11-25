import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
class resumes extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            fileName : this.props.match.params.filename,
            numPages: null,
            pageNumber: 1
        }
        this.onDocumentLoad = this.onDocumentLoad.bind(this);

    }

    componentDidMount(){
        console.log(this.state.fileName);
    }
    
    
        onDocumentLoad = ({ numPages }) => {
            this.setState({ numPages });
          }

    render() { 
        const {fileName,pageNumber,numPages} = this.state;
        const fileURL = "http://localhost:3001/resumeFolder/"+fileName;
        return ( 

        <div>
            <Document
          file={fileURL}
          onLoadSuccess={this.onDocumentLoad}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p> 
        </div>
         );
    }
}
 
export default resumes;