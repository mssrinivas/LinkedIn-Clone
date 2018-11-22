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
class jobs extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            results:[],
            easyButton : false,
            customButton : false

        }
        this.applySavedJob = this.applySavedJob.bind(this);
    }
    componentWillMount(){
        
        console.log("inside componentdidmount of saved jobs")
         axios.get(`${BASE_URL}/applications/saved`)
             .then((response) => {
            console.log("response data : " + response.data);
        
            this.setState({
                results : this.state.results.concat(response.data),
            });
        });
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
        var redirectVar = null;
        if(this.state.customButton){ redirectVar = <Redirect to="/customapply" /> }
       
        let jobItem = this.state.results.map(item =>{
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
                    <button type="submit" onClick={this.applySavedJob.bind(this, item)} className="applybut">{item.easyApply ? "Easy Apply" : "Apply"}</button></div>
                    
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
                    
                {/* <EasyModal/> */}
                </div>
                
            </div>
         );
    }
}
const mapStateToProps = (state) =>{
    return {}
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