import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import JobListCard from './joblistcard.js';
import JobDescription from './jobdescription.js';
import {Launcher} from 'react-chat-window'
import axios from 'axios';
import Navbar from './../navbar/Navbar.jsx';
import {BASE_URL} from './../constants/constants.js';
import {SELECTED_CUSTOM_JOB_POST} from './../constants/reduxActionConstants.js';
import EasyApplyModal from './EasyApplyModal/easyApplyModal.js';

class JobListing extends Component {
    constructor(props){
        super(props)
        this.state = {
            postings :[],
            messageList: [],
            selectedIndex : null,
            customApply : false,
            easyApply : false,
            error : null,
            saveApplyJobMessage : null,
            previoustime : new Date()
        };

        this.jobPostCardClicked = this.jobPostCardClicked.bind(this);
        this.saveJob = this.saveJob.bind(this);
        this.applyJob = this.applyJob.bind(this);
        this.easyApply = this.easyApply.bind(this);
    }

    componentWillMount(){
        const url = BASE_URL+"/jobs/search";
        axios.get(url).then((response)=>{
            const {status} = response;
            if(status===200){
                console.log(response.data);
                this.setState({ postings : response.data.joblistings });
            }else{
                this.setState({error : response.data.msg});
            }
        }).catch((error)=>{
            this.setState({error : "Connection timed out"});
        })
    }

    async saveJob(position){
        const posting = this.state.postings[position];
        const url = BASE_URL+"/jobs/save/"+posting._id;
        const data = {
            "companyName" :posting.CompanyName,
            "jobTitle" : posting.JobTitle,
            "jobLocation" : posting.JobLocation,
            "applicant_id" :this.props.user._id,
            "RecruiterEmail" :posting.Email,
            "Email" :this.props.user.email,
            "companyLogo" : posting.CompanyLogo,
            "easyApply" : posting.easyApply,
            "postingDate" : posting.postingDate
        };

        try {
            const response = await axios.post(url,data);
            switch(response.status){
                case 200 : this.setState({saveApplyJobMessage:"Job saved successfully",error:null});break;//alert(" Job saved successfully");
                case 201 : this.setState({saveApplyJobMessage:null,error:"We could not save the job"});break;//alert("We could not save the job");break;
                default : this.setState({saveApplyJobMessage:null,error:"There was a connection error"});break;//alert("There was a connection error");break;
            }
        } catch (error) {
            //alert("Could not connect to db");
            this.setState({saveApplyJobMessage:null,error : "Could not connect to db"});
        }

    }

    applyJob(position){
       const {postings} = this.state
       const easyApply =  postings[position].easyApply;
       if(easyApply){
           this.setState({easyApply : true});
       }else{
           this.props.jobPost(postings[position]);
            this.setState({customApply : true});
       }
    }

    easyApply=(data,position)=>{
        console.log("in easy apply of joblistings");
        console.log(data);
        console.log(position);
        const posting = this.state.postings[position];
        /*
        {
            "_id": "5bef8b0f212f417c61a2ef2b",
            "CompanyName": "LinkedIn",
            "Email": "recruiter@gmail.com",
            "recruiterName": "Beth Andre",
            "CompanyLogo": "https://img.icons8.com/color/200/5e6d77/linkedin.png",
            "JobTitle": "Software Engineer",
            "jobFunction": "Data Analytics",
            "easyApply": false,
            "JobLocation": "San Jose,California",
            "numberofApplicants": 0,
            "seniorityLevel": "Entry Level",
            "description": "Design and build high performance tolerant and scalable applications using azure services\nDesign and build high performance tolerant and scalable applications using azure services\nDesign and build high performance tolerant and scalable applications using azure services\nDesign and build high performance tolerant and scalable applications using azure servicesDesign and build high performance tolerant and scalable applications using azure services",
            "postingDate": "2018-10-14",
            "employmentType": "Full Time",
            "industryType": "Information Technology",
            "experience": 2,
            "budget": 90
        },
        */
       const dataToBeSent = {
        CompanyName : posting.CompanyName,
        JobTitle : posting.JobTitle,
        JobLocation : posting.JobLocation,
        Applicant_id : this.props.user._id,
        Email :data.email,
        RecruiterEmail : posting.Email,
        Applied :true,
        Saved : false,
        easyApply : true,
        First_name : data.firstname,
        Last_name : data.lastname,
        postingDate : posting.postingDate,
        CompanyLogo : posting.CompanyLogo
    }

        if(data.file != null){

            const url = `${BASE_URL}/jobs/easyapplywithfile/${posting._id}`;
            const config= { headers:{ 'Content-Type':'multipart/form-data' } };

            const timestamp = new Date().getTime();
            const resumeName = "http://localhost:3001/resumeFolder/"+this.props.user._id+"/"+timestamp+"-"+data.file.name;
            const newDataToBeSent = Object.assign({},dataToBeSent,{resume:resumeName});

            let formData = new FormData();
            formData.set("savejob",JSON.stringify(newDataToBeSent));
            formData.set("files",data.file);

            console.log(newDataToBeSent);
            axios.post(url,formData,config).then((response)=>{
                if(response.status === 200){
                    this.setState({saveApplyJobMessage:"Successfully applied for job",error:null});
                }else{
                    this.setState({saveApplyJobMessage:null,error:"We could not apply for the job. There was a connection error"});
                }
        }).catch((error)=>{
            this.setState({saveApplyJobMessage:null,error:"We could not apply for the job. There was a connection error"});
        })


        }else{
            const url = `${BASE_URL}/jobs/easyapply/${posting._id}`;
            /*
            const dataToBeSent = {
                CompanyName : posting.CompanyName,
                JobTitle : posting.JobTitle,
                JobLocation : posting.JobLocation,
                Applicant_id : this.props.user._id,
                Email :data.email,
                RecruiterEmail : posting.Email,
                Applied :true,
                Saved : false,
                easyApply : true,
                First_name : data.firstname,
                Last_name : data.lastname,
                resume : this.props.user.resume_path[parseInt(data.existingresume)]
            }*/
            const newDataToBeSent = Object.assign({},dataToBeSent,{resume : this.props.user.resume_path[parseInt(data.existingresume)]});

            axios.post(url,newDataToBeSent).then((response)=>{
                    if(response.status === 200){
                        this.setState({saveApplyJobMessage:"Successfully applied for job",error:null});
                    }else{
                        this.setState({saveApplyJobMessage:null,error:"We could not apply for the job. There was a connection error"});
                    }
            }).catch((error)=>{
                this.setState({saveApplyJobMessage:null,error:"We could not apply for the job. There was a connection error"});
            })
        }
    }

    jobPostCardClicked(position){
        this.setState({selectedIndex : position});
        const obj = this.state.postings[position]
        localStorage.setItem("RECRUITERNAME",obj.recruiterName)
        var url = 'http://localhost:3001/userdata/job'
        fetch(url, {
          method: 'post',
          credentials : 'include',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            Company: obj.CompanyName,
            JobTitle: obj.JobTitle,
            recruiterName: obj.recruiterName
           })
        })
        .then(response => response.json())
        .then(poststatus => {
          console.log(poststatus)
          if(poststatus === "Tracked Successfully")
          {
            alert("Click Tracked")  
          }
          else
          {
            alert("Click Not Tracked")
          }
      })



    }

    _onMessageWasSent(message) {
        this.setState({
          messageList: [...this.state.messageList, message]
        })
      }

      _sendMessage(text) {
        if (text.length > 0) {
          this.setState({
            messageList: [...this.state.messageList, {
              author: 'them',
              type: 'text',
              data: { text }
            }]
          })
        }
      }

    render() {
      if(this.props.jobSearch.joblistings!=null && this.props.jobSearch.joblistings != undefined && this.props.jobSearch.joblistings.length!=0 && this.props.jobSearch.joblistings!=[]) {
          this.state.postings = this.props.jobSearch.joblistings
      }
        var redirectVar = null;
        var saveApplyMessageDiv = null;
        var errorMessageDiv = null;
        const {postings,error,selectedIndex,easyApply,customApply,saveApplyJobMessage} = this.state;
        const isSelected = selectedIndex!=null;
        const joblistClassName = isSelected ? "col-md-4 postings-parent" : "col-md-10 postings-parent"
        const descriptionClassName = isSelected ?"col-md-6" : "col-md-0" ;
        const jobdescription= isSelected ? <JobDescription data={postings[selectedIndex]} position={selectedIndex} onSave={this.saveJob} onApply={this.applyJob} onEasyApply={this.easyApply} /> : null;
        const launcher = isSelected ? <Launcher agentProfile={{ teamName: postings[selectedIndex].recruiterName,imageUrl: postings[selectedIndex].CompanyLogo }} onMessageWasSent={this._onMessageWasSent.bind(this)} messageList={this.state.messageList} showEmoji /> : null;
        errorMessageDiv = error ? <div class="alert alert-danger" role="alert">{error}</div> : null;
        saveApplyMessageDiv = saveApplyJobMessage ? <div class="alert alert-success" role="alert">{saveApplyJobMessage}</div> : null

        if(customApply){ redirectVar = <Redirect to="/customapply" /> }
        //else if(easyApply){  redirectVar = <Redirect to="/easyapply" /> }

        return (
            <div>
                {redirectVar}
                <Navbar />
                {errorMessageDiv}
                {saveApplyMessageDiv}

                <div className="row">
                    <div className="col-md-1"></div>
                    <div className={joblistClassName} style={{ border: '1px solid #E0E0E0' }}>
                        {
                            postings.map((post, index) => {
                                return (<JobListCard data={post} onCardClicked={this.jobPostCardClicked} key={index} position={index} />);
                            })
                        }
                    </div>
                    <div className={descriptionClassName}>
                        {jobdescription}
                        {launcher}
                        &nbps;&nbps;&nbps;<p>Recruiter Name : {localStorage.getItem("RECRUITERNAME")}</p>
                    </div>
                    <div className="col-md-1"></div>
                </div>

            </div>

         );
    }
}

const mapStateToProps = (state) =>{
    return {
        user : state.LoginReducer.currentUserDetails,
        jobSearch : state.LoginReducer.jobSearch,
        jobSearchCriteria : state.LoginReducer.jobSearchCriteria
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        jobPost: (jobpost)=>{
            dispatch({
                type:SELECTED_CUSTOM_JOB_POST,
                payload : jobpost
            });
        }
    }
}
//export default JobListing;
export default connect(mapStateToProps,mapDispatchToProps)(JobListing);
