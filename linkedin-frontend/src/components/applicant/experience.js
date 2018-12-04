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
  constructor(props) {
    super(props);
    this.userDetails={

    };
  }
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
saveExperience =(e) => {
      e.preventDefault();
      this.userDetails.applicant_id = this.props.currentUserDetails.applicant_id;
      this.userDetails.company = this.
      this.props.profileUpdate(this.userDetails);
    }
  render() {
    return (
    		 <div>
         <div className="card-experience">
           <div className='bg-light-orange  br1 pa1 ma1 bw1 shadow-1'>
           <a href="" data-toggle="modal" data-target="#experienceModal">
             <img className="edit-gly"src="https://imageog.flaticon.com/icons/png/512/61/61456.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF"/>
           </a>
           <div className="modal fade" id="experienceModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
               <div className="modal-dialog" role="document">
                 <div className="modal-content custommodel">
                 <div className="modal-body">
                   <table>
                   <tbody>
                   <tr>
                       <label className="label-class"> Education*</label>
                     </tr>
                     <tr>
                       <textarea className="about-class"rows="1" cols="50" defaultValue={this.props.currentUserDetails.education}
                       onChange={(event) => { this.userDetails.education = event.target.value}}/>

                     </tr>
                     <tr>
                       <label className="label-class"> Job Title*</label>
                     </tr>
                     <tr>
                       <textarea className="about-class"rows="1" cols="50" defaultValue={this.props.currentUserDetails.job_title}
                       onChange={(event) => { this.userDetails.job_title = event.target.value}}/>

                     </tr>
                     <tr>
                       <label className="label-class"> Skills*</label>
                     </tr>
                     <tr>
                       <textarea className="about-class"rows="1" cols="50" defaultValue={this.props.currentUserDetails.skills}
                       onChange={(event) => { this.userDetails.skills = event.target.value}}/>

                     </tr>
                     <tr>
                       <td> <label className="label-class"> Company</label> </td>
                       <td> <label className="labellast-class"> Experience</label> </td>
                     </tr>
                     <tr>
                       <td>
                           <input className="name-class" type="text" defaultValue={this.props.currentUserDetails.company}
                             onChange={(event) => { this.userDetails.company = event.target.value}}/>
                       </td>
                       <td>
                           <input className="lastname-class" type="number" defaultValue={this.props.currentUserDetails.experience}
                             onChange={(event) => { this.userDetails.experience = event.target.value}}/>
                       </td>
                     </tr>
                     <tr>
                       <td> <label className="label-class"> City </label> </td>
                       <td> <label className="labellast-class"> State </label> </td>
                     </tr>

                     <tr>
                       <td>
                           <input className="name-class" type="text" defaultValue={this.props.currentUserDetails.city}
                             onChange={(event) => { this.userDetails.city = event.target.value}}/>
                       </td>
                       <td>
                           <input className="lastname-class" type="text" defaultValue={this.props.currentUserDetails.state}
                             onChange={(event) => { this.userDetails.state = event.target.value}}/>
                       </td>
                     </tr>
                     <br></br>
                     <tr>
                       <label className="label-class"> Summary*</label><br></br><br></br>
                     </tr>
                     <tr>
                       <textarea className="about-class"rows="4" cols="50" defaultValue={this.props.currentUserDetails.profile_summary}
                       onChange={(event) => { this.userDetails.profile_summary = event.target.value}}/>
                        <br></br><br></br>
                     </tr>
                     <input className="image-upload" type="file" name="photos" onChange={this.handleUpload}/>
                        </tbody>
                        </table>
                 </div>
                     <div className="modal-footer">
                         <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                         <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e) => {this.saveExperience(e)}}>Save changes</button>
                     </div>
                 </div>
                 </div>
           </div>
                 <br></br>
                 <h2 className="dashboard-name1"> Experience</h2>
                 <hr/>
                 <br></br>
                 {this.props.currentUserDetails.workexperience.length == 0 ? "Please update your skills":''}
                 {this.props.currentUserDetails.workexperience.map((post) => {
                        return(
                                <div>
                                   <h5 className="dashboard-name2">{post}</h5>
                               </div>
                             );
                           })
                         }
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
