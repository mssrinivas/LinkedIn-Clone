import React,{ Component } from 'react';
import './applicantprofile.css';
import axios from 'axios';
import 'tachyons';
import { Glyphicon } from 'react-bootstrap';
// import connection from './connection.png';
import connection from './connection1.jpg';
// import ProfileHeader from './profileheader';
import * as UTIL from './../../util/utils';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import {updateProfileHandler} from './../../api/Api';
import * as VALIDATION from './../../util/validation';
import Navbar from './../navbar/Navbar.jsx';

class Experience extends Component {
    componentWillMount(){
      this.userDetails={
        email:this.props.currentUser,
        firstName:this.props.currentUserDetails.first_name,
        lastName:this.props.currentUserDetails.last_name,
        headline:this.props.currentUserDetails.headline,
        profile_summary:this.props.currentUserDetails.profile_summary,
        education:this.props.currentUserDetails.education,
        company:this.props.currentUserDetails.company,
        school:this.props.currentUserDetails.school,
        title : this.props.currentUserDetails.title,
        profileImage:"http://localhost:3001/uploads/"+this.props.currentUserDetails.applicant_id+".jpeg",
        status:'Active'
      }
    }
  render() {
    return (
    		 <div>
         <div className="card-experience">
           <div className='bg-light-orange  br1 pa1 ma1 bw1 shadow-1'>
                 <br></br>
                 <h2 className="dashboard-name1"> Experience</h2>
                 <br></br>
                 <h5 className="dashboard-name2">{this.props.currentUserDetails.job_title}</h5>
                 <br></br>
                 <h5 className="dashboard-name2">{this.props.currentUserDetails.company}</h5>
                 <br></br>
                 <h5 className="dashboard-name2">{this.props.currentUserDetails.skills!=null?this.props.currentUserDetails.skills:"Please update your skills"}</h5>
                 <br></br><br></br>
                 <hr/>
                 <h2 className="dashboard-name1"> Education</h2>
                 <br></br>
                 <h5 className="dashboard-name2">{this.props.currentUserDetails.school!=null ? "Studies at : " +this.props.currentUserDetails.school : "Please enter educational details"}</h5>
                 <br></br>
                 <h5 className="dashboard-name2">{this.props.currentUserDetails.education!=null ? "Pursuing " +this.props.currentUserDetails.education : ""}</h5>
                 <br></br>
                 <br></br><br></br>
           </div>
           </div>
    		 </div>
        );
	  }
	}

  function mapStateToProps(state) {
    console.log("State",state);
      return {
         currentUser: state.LoginReducer.current_user,
         currentUserDetails: state.LoginReducer.currentUserDetails,
         userProfileDetails: state.LoginReducer.userProfileDetails
      };
  }


export default connect(mapStateToProps,null)(Experience);
