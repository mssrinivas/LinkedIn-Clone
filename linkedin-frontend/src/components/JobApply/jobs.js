import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './apply.css';
import axios from 'axios';
import {BASE_URL} from './../../components/constants/constants.js';
import Navbar from './../navbar/Navbar.jsx';
class jobs extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            results:[]
        }
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
    render() { 
        let jobItem = this.state.results.map(item =>{
            return(
                <div className="row appliedjobs">
                    <div className="col-md-1">
                    <img className="clogo" src="https://media.licdn.com/dms/image/C4E0BAQGHz8JwrMTQ0A/company-logo_100_100/0?e=1550707200&v=beta&t=tTf0srlNoO8GUDYGmPa1J6WKvgqbifvtPYKEOmdcfFc"/>&nbsp;
                     </div>
                     <div className="col-md-9">
                     <h3 className="jobtitle">{item.JobTitle}</h3>
                    <h4 className="companyname">{item.CompanyName}</h4>
                    <h5 className="joblocation">{item.Address}</h5></div>
                    <div className="col-md-2">
                    <button className="applybut">{item.easyApply ? "Easy Apply" : "Apply"}</button></div>
                    <hr/>
                
                   
                </div>
            )
        })
        return ( 
            
            <div className="back">
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
                
            </div>
         );
    }
}
 
export default jobs;