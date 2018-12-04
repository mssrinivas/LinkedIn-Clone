import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import JobListCard from './joblistcard.js';
import JobDescription from './jobdescription.js';
import {Launcher} from 'react-chat-window'
import axios from 'axios';
import Navbar from './../navbar/Navbar.jsx';
import {BASE_URL} from './../constants/constants.js';
import {SELECTED_CUSTOM_JOB_POST,ADD_JOB_ID_TO_APPLIED_JOB,ADD_JOB_ID_TO_SAVED_JOB} from './../constants/reduxActionConstants.js';
import SearchBar from './SearchBar.jsx';
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
            saved_job : [],
            applied_job:[]
        };

        this.jobPostCardClicked = this.jobPostCardClicked.bind(this);
        this.saveJob = this.saveJob.bind(this);
        this.applyJob = this.applyJob.bind(this);
        this.easyApply = this.easyApply.bind(this);
    }

    componentDidMount(){

        const url = BASE_URL+"/jobs/search";
        console.log("inside cdm")
        console.log(url);
        axios.get(url).then((response)=>{
                        
            if(response.status===200){
                console.log("in response");
                const listings = response.data.joblistings;

                const {applied_job,saved_job} = this.props.user;
                const notShowJobs = [].concat(applied_job,saved_job,this.state.applied_job,this.state.saved_job);
                

                console.log("not show jobs :"+JSON.stringify(notShowJobs));

                const filteredList = listings.filter((post)=>{
                    const id = post._id;
                    return !notShowJobs.includes(id);

                })

                this.setState({ postings : filteredList });

            }else{
                this.setState({error : "Could not fetch jobs!!!"});
            }
        }).catch((error)=>{
            console.log("inside error");
            this.setState({error : "Connection timed out"});
        })
    }

    async saveJob(position){
        console.log("inside save job ")
        const posting = this.state.postings[position];
        const url = BASE_URL+"/jobs/save/"+posting._id;
        console.log(url);
        const data = {
            "companyName" :posting.CompanyName,
            "jobTitle" : posting.JobTitle,
            "jobLocation" : posting.JobLocation,
            "applicant_id" :this.props.user._id,
            "email" :posting.Email,
            "companyLogo" : posting.CompanyLogo,
            "easyApply" : posting.easyApply,
            "RecruiterEmail" : posting.Email
        };

        console.log(data);
        try {
            const response = await axios.post(url,data);
            console.log("response status after save"+response.status);

            if(response.status === 200){
                //alert("Job Saved successfully");
                const a = this.state.saved_job;
                a.push(posting._id);
                this.setState({saveApplyJobMessage:"Job Saved successfully",error:null,saved_job:a,selectedIndex:null});
                //this.props.addJobIdToSavedJob(posting._id);
            }else{
                this.setState({saveApplyJobMessage:null,error:"We could not save the job"});
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
                    
                    const a = this.state.applied_job;
                    a.push(posting._id);
                    this.setState({saveApplyJobMessage:"Successfully applied for job",error:null,applied_job:a});
                    //alert("Job applied successfully")
                    //this.props.addJobIdToAppliedJob(posting._id);
                    
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
                        const a = this.state.applied_job;
                        a.push(posting._id);
                        this.setState({saveApplyJobMessage:"Successfully applied for job",error:null,applied_job:a});
                        //alert("Job applied successfully");
                        //this.props.addJobIdToAppliedJob(posting._id);
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
        
        var redirectVar = null;
        var saveApplyMessageDiv = null;
        var errorMessageDiv = null;
        
        var {postings,error,selectedIndex,easyApply,customApply,saveApplyJobMessage,saved_job,applied_job} = this.state;
        var searchCriteria = this.props.searchCriteria;

        /*  Filtering list */
        const CompanyNameFilter = searchCriteria.CompanyName==null ? "" : searchCriteria.CompanyName;
        const postingDateFilter = searchCriteria.date==null ? "" : searchCriteria.date;
        const seniorityLevelFilter = searchCriteria.seniorityLevel==null ? "" : searchCriteria.seniorityLevel;
        const locationFilter = searchCriteria.location==null ? "" : searchCriteria.location;

        console.log("Printing filtering criterias");
        console.log(CompanyNameFilter,postingDateFilter,seniorityLevelFilter,locationFilter);

        /*
        const newPostings = postings.filter((post)=>{
            var companyNameFilterResult = true;
            var postingDateFilterResult = true;
            var seniorityLevelFilterResult = true;
            var locationFilterResult = true;

            if(CompanyNameFilter != ""){
                const regexCompanyName = new RegExp(CompanyNameFilter,'i');
                companyNameFilterResult = regexCompanyName.test(post.CompanyName); 
                console.log("Company name regex");
            }

            if(seniorityLevelFilter != ""){
                const regexSeniorityLevelFilter = new RegExp(seniorityLevelFilter,'i');
                seniorityLevelFilterResult = regexSeniorityLevelFilter.test(post.seniorityLevel);  
                console.log("Seniority level regex");
            }

            if(locationFilter != ""){
                const regexLocationFilter = new RegExp(locationFilter,'i');
                locationFilterResult = regexLocationFilter.test(post.JobLocation);
                console.log("Location regex");  
            }

            return (companyNameFilterResult && postingDateFilterResult && seniorityLevelFilterResult && locationFilterResult);
        });

        */

        const newPostings = postings.map((post,index)=>{
        
        if(applied_job.includes(post._id) || saved_job.includes(post._id)){
            return false;
        }    
        
        var companyNameFilterResult = true;
        var postingDateFilterResult = true;
        var seniorityLevelFilterResult = true;
        var locationFilterResult = true;

        if(CompanyNameFilter != ""){
            const regexCompanyName = new RegExp(CompanyNameFilter,'i');
            companyNameFilterResult = regexCompanyName.test(post.CompanyName); 
            console.log("Company name regex");
        }

        if(postingDateFilter != ""){
            const postDate = new Date(post.postingDate).getTime();
            const filteredDate = new Date(postingDateFilter).getTime();

            if(postDate-filteredDate <0){
                postingDateFilterResult = false;
            }

            console.log("Posting Date regex");
        }

        if(seniorityLevelFilter != ""){
            const regexSeniorityLevelFilter = new RegExp(seniorityLevelFilter,'i');
            seniorityLevelFilterResult = regexSeniorityLevelFilter.test(post.seniorityLevel);  
            console.log("Seniority level regex");
        }

        if(locationFilter != ""){
            const regexLocationFilter = new RegExp(locationFilter,'i');
            locationFilterResult = regexLocationFilter.test(post.JobLocation);
            console.log("Location regex");  
        }

        const cond = (companyNameFilterResult && postingDateFilterResult && seniorityLevelFilterResult && locationFilterResult);

        return (<JobListCard data={post} onCardClicked={this.jobPostCardClicked} key={index} position={index} show={cond} />);

    });

        console.log("Printing new postings");
        console.log(newPostings.length);
        console.log(newPostings);

        //console.log("\n\n new Postings"+ JSON.stringify(newPostings));

        const isSelected = selectedIndex!=null;
        const joblistClassName = isSelected ? "col-md-4 postings-parent" : "col-md-10 postings-parent"
        const descriptionClassName = isSelected ?"col-md-6" : "col-md-0" ;
        const jobdescription= isSelected ? <JobDescription data={postings[selectedIndex]} position={selectedIndex} onSave={this.saveJob} onApply={this.applyJob} onEasyApply={this.easyApply} /> : null;
        const launcher = isSelected ? <Launcher agentProfile={{ teamName: postings[selectedIndex].recruiterName,imageUrl: postings[selectedIndex].CompanyLogo }} onMessageWasSent={this._onMessageWasSent.bind(this)} messageList={this.state.messageList} showEmoji /> : null;
        
        errorMessageDiv = error ? <div class="alert alert-danger" role="alert">{error}</div> : null;
        saveApplyMessageDiv = saveApplyJobMessage ? <div class="alert alert-success" role="alert">{saveApplyJobMessage}</div> : null

        if(customApply){ redirectVar = <Redirect to="/customapply" /> }

        return (
            <div>
                {redirectVar}
                <Navbar />
                <SearchBar />
                {errorMessageDiv}
                {saveApplyMessageDiv}

                <div className="row">
                    <div className="col-md-1"></div>
                    <div className={joblistClassName} style={{ border: '1px solid #E0E0E0' }}>
                        {
                            /*
                            postings.map((post, index) => {
                                return (<JobListCard data={post} onCardClicked={this.jobPostCardClicked} key={index} position={index} show={true}/>);
                            })
                            */
                            
                           newPostings
                        }
                    </div>
                    <div className={descriptionClassName}>
                        {jobdescription}
                        {launcher}
                    </div>
                    <div className="col-md-1"></div>
                </div>

            </div>

         );
    }
}

const mapStateToProps = (state) =>{
    console.log("In map state to props of job listings");
    console.log(state.LoginReducer.jobSearchCriteria);
    return {
        user : state.LoginReducer.currentUserDetails,
        searchCriteria : state.LoginReducer.jobSearchCriteria
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        jobPost: (jobpost)=>{
            dispatch({
                type:SELECTED_CUSTOM_JOB_POST,
                payload : jobpost
            });
        },

        addJobIdToAppliedJob : (jobid)=>{
            dispatch({
                type : ADD_JOB_ID_TO_APPLIED_JOB,
                payload:jobid
            })
        },

        addJobIdToSavedJob : (jobid)=>{
            dispatch({
                type : ADD_JOB_ID_TO_SAVED_JOB,
                payload:jobid
            })
        }
    }
}
//export default JobListing;
export default connect(mapStateToProps,mapDispatchToProps)(JobListing);
