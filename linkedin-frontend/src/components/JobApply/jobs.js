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
import serialize from 'form-serialize';
import {history} from "../../util/utils";
import { Document, Page } from 'react-pdf';

var swal = require('sweetalert')
var resume = "";

function ExistingResume(props){
    const{file,index} = props;
    const fields = file.split("/");
    var filename=fields.pop();
    var userid = fields.pop();
    const url = "/resumes/"+userid+"/"+filename;
    console.log("userid:"+userid+"-filename:"+filename);
    return(
        <div>
            <input type="radio" name="existingresume" value={index} /> <Link to={url} target="_blank">{filename}</Link>
        </div>
    );
}

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
    fileName : "",
    file : null,
    selectedFile : ""

        }
        this.applySavedJob = this.applySavedJob.bind(this);
        this.onDocumentLoad = this.onDocumentLoad.bind(this);
        this.fileChangeHandler = this.fileChangeHandler.bind(this);
        this.submitApplicationHandler = this.submitApplicationHandler.bind(this);
        // this.resumeUploadedHandler = this.resumeUploadedHandler.bind(this);
    }
    onDocumentLoad = ({ numPages }) => {
        this.setState({ numPages });
      }

    fileChangeHandler = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
          })
    }
    submitApplicationHandler = (e)=>{
        console.log("---Inside easyapply of saved job----")
        e.preventDefault();
        var form = serialize(e.target, { hash: true });
        const { selectedFile } = this.state;
        console.log(form.Job_id);
        console.log(form.postingDate);

        let Applicant_id = this.props.user._id;


        console.log("selected file name: " + selectedFile.name);

        if(selectedFile.name==undefined && form.existingresume==null){
            alert("You cannot apply without a resume");
            return;
        }
        if(selectedFile.name != undefined){
            if(selectedFile.name.slice(-3) !="pdf"){
                alert("Please upload a pdf file");
            }else{
                console.log("Applicant_id for file upload: " + Applicant_id);
                console.log("selected file name: " + selectedFile.name);
                const formData = new FormData();
                formData.append('applicant_id', Applicant_id);
                formData.append('selectedFile', selectedFile);
                axios.post(`${BASE_URL}/uploadresume`, formData)
                .then((response) => {
                    if(response.status == 200){
                        console.log("Resume upload Status: " + response.status );
                        console.log("file which was uploaded: " + response.data );
                        resume = response.data;
                        const values = {
                            Applicant_id : this.props.user._id,
                            Job_id : form.Job_id,
                            email : form.email,
                            firstname : form.firstname,
                            lastname : form.lastname,
                            resume :resume ,
                            appliedDate : new Date(),
                            postingDate : form.postingDate
                        }
                        console.log("input values" , values)
                        axios.post(`${BASE_URL}/apply/easy`, values)
                            .then((response) => {
                            if(response.status == 200)
                            {
                                console.log("easy apply status : ", response.status)
                                swal("Job Applied successfully!", " ", "success");
                            }else{
                                alert("Something went wrong!!")
                            }

                        })
                    }
                })
            }

        }
        else{

            var existingResumeFilePath = this.props.user.resume_path[form.existingresume];
            const fields = existingResumeFilePath.split("/");
            console.log("existing resume path" , existingResumeFilePath)
            var filename=fields.pop();
            console.log("existing resume" , filename)
            const values = {
                Applicant_id : this.props.user._id,
                Job_id : form.Job_id,
                email : form.email,
                firstname : form.firstname,
                lastname : form.lastname,
                resume :filename ,
                appliedDate : new Date(),
                postingDate : form.postingDate
            }
            console.log("input values" , values)
            axios.post(`${BASE_URL}/apply/easy`, values)
                .then((response) => {
                if(response.status == 200 && response.data == "Applied successfully")
                {
                    console.log("easy apply status : ", response.status)
                    swal("Job Applied successfully!", " ", "success");
                }else{
                    alert("Something went wrong!!")
                }

            })
        }



        // var form = serialize(e.target, { hash: true });
        // const {file} = this.state;
        // console.log("file " , file)
        // console.log("existing resume" , form.existingresume)
        // if(file==null && form.existingresume==null){
        //     alert("You cannot apply without a resume");
        //     return;
        // }

        // if(file != null){
        //     if(file.name.slice(-3) !="pdf"){
        //         alert("Please upload a pdf file");
        //     }else{
        //         const newForm = Object.assign({},form,{file});
        //         this.props.onSubmitApplication(newForm);
        //     }

        // }
        // else{
        //     this.props.onSubmitApplication(form);
        // }



    }
    componentDidMount(){

        console.log("inside componentdidmount of saved jobs")
        let ID = this.props.user._id;
         axios.get(`${BASE_URL}/applications/saved/`+ID)
             .then((response) => {
                if(response.status == 200){
                    console.log("response data : " + JSON.stringify(response.data));
                    this.setState({
                        results : this.state.results.concat(response.data),
                    });
                }else{
                    alert("Oops! Something went wrong. Login again")
                }

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
      if(!localStorage.getItem('servertoken'))
      {
        history.push('/')
      }
        const { pageNumber, numPages } = this.state;
        var redirectVar = null;
        if(this.state.customButton){ redirectVar = <Redirect to="/customapply" /> }


        let jobItem = this.state.results.map(item =>{
            var applyButton = null;
            if(item.easyApply){
                applyButton = <div>
                <button type="submit" onClick={this.applySavedJob.bind(this, item)} className="applybut" data-toggle="modal" data-target="#easyApplyModal">Easy Apply</button>
                <div class="modal fade" id="easyApplyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">

  <form onSubmit={this.submitApplicationHandler} >
    <div class="modal-content">
      <div class="modal-header">
        <h4 className="modalhead">Apply to {item.CompanyName}</h4>
    </div>
        <div class="modal-body mx-3">
        <div className="spacing">
            <label for="fname">FirstName</label>
            <input type="text"  id="fname" name="firstname" defaultValue={this.props.user.first_name} className="textemail"/>
        </div>
        <input type="hidden" value={item.Job_id} name="Job_id" />
        <input type="hidden" value={item.postingDate} name="postingDate" />
        <div className="spacing">
            <label for="lname">LastName</label>
            <input type="text" id="lname" name="lastname" defaultValue={this.props.user.last_name} className="textemail"/>
        </div>
        <div className="spacing">
            <label for="emailid">Email</label>
            <input type="email" id="emailid" name="email" defaultValue={this.props.user.email} className="textemail1"/>
        </div>
        <div className="spacing">
            <label for="previous-resume">Previous resume</label>
            {
                this.props.user.resume_path.map((filename,index)=>{
                    return( <ExistingResume key={index} file={filename} index={index} />  );
                })

            }
        </div>
        <div className="spacing">
            <label for="emailid">Resume</label>
            <input type="file" id="emailid" name="files" onChange={this.fileChangeHandler}  accept="application/pdf" className="textemail2"/>
        </div>
        </div>
      <div class="modal-footer d-flex justify-content-center">

      <button type="button" className="but" data-dismiss="modal">Cancel</button>
      <button className="but" type="submit" >Submit Application</button>
      </div>
    </div>
    </form>
  </div>
</div></div>
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
                {/* <div class="modal fade" id="easyApplyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4 className="modalhead">Apply to Mozilla</h4>
    </div>
        <div class="modal-body mx-3">
        <div className="spacing">
            <label for="fname">FirstName</label>
            <input type="text" id="fname" defaultValue={this.props.user.first_name} className="textemail"/>
        </div>
        <div className="spacing">
            <label for="lname">LastName</label>
            <input type="text" id="lname" defaultValue={this.props.user.last_name} className="textemail"/>
        </div>
        <div className="spacing">
            <label for="emailid">Email</label>
            <input type="email" id="emailid" defaultValue={this.props.user.email} className="textemail1"/>
        </div>
        <div className="spacing">
            <label for="previous-resume">Previous resume</label>
            {
                this.props.user.resume_path.map((filename,index)=>{
                    return( <ExistingResume key={index} file={filename} index={index} />  );
                })

            }
        </div>
        <div className="spacing">
            <label for="emailid">Resume</label>

             {/* <Link to="/test.pdf" target = "_blank">Download Pdf</Link>
             <Link to="/resumes/EBT_BO.pdf" target = "_blank">EBT_BO.pdf</Link> */}
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
            {/* <input onChange={this.resumeUploadedHandler} type="file" name="files" id="resume" accept="application/pdf"  className="textemail2"/> */}
            {/* <input type="file" id="emailid" name="files" onChange={this.fileChangeHandler}  accept="application/pdf" className="textemail2"/>
        </div>
        </div>
      <div class="modal-footer d-flex justify-content-center">
      {/* <button className="but" >Cancel</button> */}
      {/* <button type="button" className="but" data-dismiss="modal">Cancel</button>
      <button className="but" type="submit" onClick={this.submitApplicationHandler}>Submit Application</button>
      </div>
    </div>
  </div>
</div> */}
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
