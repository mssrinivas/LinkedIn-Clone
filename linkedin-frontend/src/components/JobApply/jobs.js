import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './apply.css';
import axios from 'axios';
import {BASE_URL} from './../../components/constants/constants.js';
import Navbar from './../navbar/Navbar.jsx';
import EasyModal from './easyApplyModal.js';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import {CUSTOM_APPLY_SAVED_JOB} from './../constants/reduxActionConstants.js';
import { ReactPDF} from 'react-pdf';
import PDF from 'react-pdf-js';

import { Document, Page } from 'react-pdf';
class jobs extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            results:[],
            easyButton : false,
            customButton : false,
            dashboard : "",
            numPages: null,
    pageNumber: 1,
    fileName : ""

        }
        this.applySavedJob = this.applySavedJob.bind(this);
        this.onDocumentLoad = this.onDocumentLoad.bind(this);
        this.fileChangeHandler = this.fileChangeHandler.bind(this);
    }
    onDocumentLoad = ({ numPages }) => {
        this.setState({ numPages });
      }
      fileChangeHandler = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
          })
    }
    componentWillMount(){
        
        console.log("inside componentdidmount of saved jobs")
        let ID = this.props.user._id;
         axios.get(`${BASE_URL}/applications/saved/`+ID)
             .then((response) => {
            console.log("response data : " + JSON.stringify(response.data));
        
            this.setState({
                results : this.state.results.concat(response.data),
            });
        });
    //     axios.post(`${BASE_URL}/download/` + "EBT_BO.pdf")
    //                  .then(response => {
    //                      console.log("---\ninside response of download--- "+ response.data);
    //                      this.setState( {fileName :response.data})
                            
                        
    //                      var imagePreview1 = 'data:application/pdf;base64, ' + response.data;
                        
    //                     //  var propertyArr = nextProps.dashboard.slice();
    //                     //  propertyArr[i].photos = imagePreview1;
    //                     this.setState({
    //                       dashboard: imagePreview1
    //                      });
    //                  });
    // }
    }
    applySavedJob = (Item, e) => {
        const {results} = this.state
        console.log("easyApply value ", Item.easyApply);
        if(Item.easyApply){
            
            this.setState({easyButton : true});
        }else{
            this.props.SavedCustomApply(Item);
            this.setState({customButton : true});
            
        }

    }
    render() { 
        const { pageNumber, numPages } = this.state;
        var redirectVar = null;
        if(this.state.customButton){ redirectVar = <Redirect to="/customapply" /> }
        

        let jobItem = this.state.results.map(item =>{
            var applyButton = null;
            if(item.easyApply){
                applyButton = <button type="submit" onClick={this.applySavedJob.bind(this, item)} className="applybut" data-toggle="modal" data-target="#easyApplyModal">Easy Apply</button>

            }else{
                applyButton = <button type="submit" onClick={this.applySavedJob.bind(this, item)} className= "applybut">Apply</button>
            }
            return(
                <div className="row appliedjobs">
                    <div className="col-md-1">
                    <img className="clogo" src={item.CompanyLogo}/>&nbsp;
                     </div>
                     <div className="col-md-9">
                     <h3 className="jobtitle">{item.JobTitle}</h3>
                    <h4 className="companyname">{item.CompanyName}</h4>
                    <h5 className="joblocation">{item.JobLocation}</h5></div>
                    <div className="col-md-2">
                    {/* //</div></div>/<button type="submit" onClick={this.applySavedJob.bind(this, item)} className="applybut" className= {item.easyApply} ? "applybut" data-toggle="modal" data-target="#easyApplyModal" : className="applybut">{item.easyApply ? "Easy Apply" : "Apply"} </button></div> */}
                    {applyButton}
                    </div>
                    <hr/>
                
                   
                </div>
            )
        })
        return ( 
            

            <div className="back">
            {redirectVar}
            <Navbar />
                <div className="headBar">
                <ul className="navDash">
                <li className="jobTypes">Saved Jobs</li>
                <li><Link to= "/jobs/applied" className="jobTypes">Applied Jobs</Link></li>
                </ul>
                </div>
                <div className="dashjob">
                <br/>
                <h4 style={{'margin-top':'30px','margin-left':'100px'}}>Saved Jobs({this.state.results.length})</h4>
                <hr/>
                
                {jobItem}
                    
                
                </div>
                <div class="modal fade" id="easyApplyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content"> 
      <div class="modal-header">
        <h4 className="modalhead">Apply to Mozilla</h4>
    </div>
        <div class="modal-body mx-3">
        <div className="spacing">
            <label for="fname">FirstName</label>
            <input type="text" id="fname" defaultValue="Sayali" className="textemail"/>
        </div>
        <div className="spacing">
            <label for="fname">LastName</label>
            <input type="text" id="fname" value="Sayali" className="textemail"/>
        </div>
        <div className="spacing">
            <label for="emailid">Email</label>
            <input type="email" id="emailid" value="saypatil12345@yahoo.com" className="textemail1"/>
        </div>
        <div className="spacing">
            <label for="emailid">Resume</label>
            
             {/* <Link to="/test.pdf" target = "_blank">Download Pdf</Link> */}
             <Link to="/resumes/EBT_BO.pdf" target = "_blank">EBT_BO.pdf</Link>
            {/* <Document
          file="http://localhost:3001/resumeFolder/EBT_BO.pdf"
          onLoadSuccess={this.onDocumentLoad}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>  */}
            {/* <ReactPDF
            file={{
                url: 'http://localhost:3001/public/uploads/EBT_BO.pdf'
            }}
            /> */}

            <input type="file" id="emailid" name="selectedFile" onChange={this.fileChangeHandler} className="textemail2"/>
        </div>
        </div>
      <div class="modal-footer d-flex justify-content-center">
      {/* <button className="but" >Cancel</button> */}
      <button type="button" className="but" data-dismiss="modal">Cancel</button>
      <button className="but" type="submit">Submit Application</button>
      </div>
    </div>
  </div>
</div>
            </div>
         );
    }
}
const mapStateToProps = (state) =>{
    return {
        user : state.LoginReducer.currentUserDetails
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        SavedCustomApply: (JobForCustomApply)=>{
            dispatch({
                type:CUSTOM_APPLY_SAVED_JOB,
                payload : JobForCustomApply
            });
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(jobs);