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
            saveApplyJobMessage : null
        };

        this.jobPostCardClicked = this.jobPostCardClicked.bind(this);
        this.saveJob = this.saveJob.bind(this);
        this.applyJob = this.applyJob.bind(this);
        this.easyApply = this.easyApply.bind(this);
    }

    componentDidMount(){

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
            "easyApply" : posting.easyApply
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
                    </div>
                    <div className="col-md-1"></div>
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
