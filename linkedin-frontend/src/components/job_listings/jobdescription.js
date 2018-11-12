import React, { Component } from 'react';

class JobDescription extends Component {
    
    constructor(props){
        super(props);
    }

    render() { 
        return (
            <div className="row" style={{padding:'4px'}} >
                <div className="col-md-2">
                    <img className="w-100 contain" src="https://img.icons8.com/color/200/5e6d77/linkedin.png" alt="LinkedIn" />
                </div>
                <div className="col-md-9">
                    <p style={{fontSize:'18px'}}> Software Engineer Data Analytics </p>
                    <p style={{color:'grey',fontStyle:'bold',fontSize:'16px',fontStyle:'bold'}} >LinkedIn, Palo Alto, California </p>
                    <p style={{fontSize:'13px',color:'grey'}}>Posted 2 weeks ago</p>
                    <div className="btn-group mt-2 pb-2">
                        <button type="button" className="btn btn-md" id="job-save-btn">Save</button>
                        <button type="button" className="btn btn-md" id="easy-apply-btn">Easy Apply</button>
                    </div>

                    <div className="row mt-2 pb-2" id="job-detail-row">
                        <div className="col-md-3" style={{padding:'8px'}}>
                            <p>Job</p>
                            <ul style={{fontSize:'13px',color:'#9E9E9E'}}>
                                <li>6/10 skills match</li>
                                <li>428 applicants</li>
                            </ul>
                        </div>

                        <div className="col-md-3" id="col-seperator" style={{padding:'8px'}}>
                            <p>Company</p>
                            <ul style={{fontSize:'13px',color:'#9E9E9E'}}>
                                <li>51-200 Employees</li>
                                <li>Computer Software</li>
                            </ul>
                        </div>

                        <div className="col-md-3" style={{padding:'8px'}}>
                            <p>Connections</p>
                            <ul style={{fontSize:'13px',color:'#9E9E9E'}}>
                                <li>SJSU: 2 alumni</li>
                            </ul>
                        </div>

                    </div>

                    <div className="row mt-2 pt-2">
                        <div className="col-md-9" style={{padding:'8px'}}>
                            <h5>Job Description</h5>
                            <p>Python Software Engineer : Predictive Controls Platform </p>
                            <p className="mt-1">About the job</p>
                            <ul style={{fontSize:'14px',color:'#424242'}}>
                                <li>Design and build high performance tolerant and scalable applications using azure services</li>
                                <li>Design and build high performance tolerant and scalable applications using azure services</li>
                                <li>Design and build high performance tolerant and scalable applications using azure services</li>
                                <li>Design and build high performance tolerant and scalable applications using azure services</li>
                                <li>Design and build high performance tolerant and scalable applications using azure services</li>
                            </ul>
                        </div>
                        <div className="col-md-3" style={{padding:'4px'}}>
                            <h5>How you match</h5>
                            <p style={{fontSize:'12px',color:'#9E9E9E'}}><i>Criteria provided by the job poster</i></p>
                            <p style={{fontSize:'14px'}}><b>Skills</b></p>
                            <ul style={{fontSize:'13px',padding:'4px',margin:'0px'}}>
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