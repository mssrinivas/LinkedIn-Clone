import React, { Component } from 'react';
import {timeago} from './../timeago/timeago.js';

class JobDescription extends Component {
    
    constructor(props){
        super(props);
        this.saveHandler = this.saveHandler.bind(this);
        this.applyHandler = this.applyHandler.bind(this);
    }

    saveHandler=(e)=>{
        this.props.onSave(this.props.position);
    }

    applyHandler =(e)=>{
        this.props.onApply(this.props.position);
    }

    render() { 
        const {data} = this.props;
        return (
            <div className="row" style={{padding:'4px'}} >
                <div className="col-md-2">
                    <img className="w-100 contain" src={data.companyLogo} alt={data.companyName} />
                </div>
                <div className="col-md-9">
                    <p style={{fontSize:'18px'}}> {data.jobTitle} {data.jobFunction} </p>
                    <p style={{color:'grey',fontStyle:'bold',fontSize:'16px',fontStyle:'bold'}} >{data.LinkedIn} {data.location} </p>
                    <p style={{fontSize:'13px',color:'grey'}}>Posted on {data.postingDate}</p>
                    <div className="btn-group mt-2 pb-2">
                        <button type="button" onClick={this.saveHandler} className="btn btn-md" id="job-save-btn">Save</button>
                        <button type="button" onClick={this.applyHandler} className="btn btn-md" id="easy-apply-btn">{data.easyApply ? "Easy Apply" : "Apply"}</button>
                    </div>

                    <div className="row mt-2 pb-2" id="job-detail-row">
                        <div className="col-md-3" style={{padding:'8px'}}>
                            <p>Job</p>
                            <ul style={{fontSize:'13px',color:'#9E9E9E'}}>
                                <li>{data.numberofApplicants} applicants applied</li>
                            </ul>
                        </div>

                        <div className="col-md-3" id="col-seperator" style={{padding:'8px'}}>
                            <p>Company</p>
                            <ul style={{fontSize:'13px',color:'#9E9E9E'}}>
                                <li>51-200 Employees</li>
                                <li>{data.industryType}</li>
                            </ul>
                        </div>

                        <div className="col-md-3" style={{padding:'8px'}}>
                            <p>Employment Type</p>
                            <ul style={{fontSize:'13px',color:'#9E9E9E'}}>
                                <li>{data.employmentType}</li>
                            </ul>
                        </div>

                    </div>

                    <div className="row mt-2 pt-2">
                        <div className="col-md-9" style={{padding:'8px'}}>
                            <h5>Job Seniority Level</h5>
                            <p>{data.seniorityLevel} </p>
                            <p className="mt-1">About the job</p>
                            <p style={{fontSize:'14px',color:'#424242',textAlign:'justify'}} >{data.description}</p>
                        </div>
                        <div className="col-md-3" style={{padding:'6px'}}>
                            <h5>How you match</h5>
                            <p style={{fontSize:'12px',color:'#9E9E9E'}}><i>Criteria provided by the job poster</i></p>
                            <p style={{fontSize:'14px'}}><b>Skills</b></p>
                            <ul style={{fontSize:'13px',padding:'4px',margin:'2px'}}>
                                <li>Scrum</li>
                                <li>Cloud Computing</li>
                                <li>Mongodb</li>
                                <li>Python</li>
                                <li>Network Protocols</li>
                            </ul>
                        </div>
                    </div>

                </div>

            </div>

        );
    }
}
 
export default JobDescription;