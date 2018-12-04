import React,{ Component } from 'react';
import './applicantprofile.css';
import axios from 'axios';
import 'tachyons';
import { Glyphicon } from 'react-bootstrap';
import {profileUpdate} from './../../api/Api';
import {graphUpdate} from './../../api/Api';
// import connection from './connection.png';
import connection from './connection1.jpg';
// import ProfileHeader from './profileheader';
import * as UTIL from './../../util/utils';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import {updateProfileHandler} from './../../api/Api';
import * as VALIDATION from './../../util/validation';
import Navbar from './../navbar/Navbar.jsx';
import Experience from './experience'
import ResumeView from './resumeview'
import {history} from "../../util/utils";
import {BASE_URL} from './../../components/constants/constants.js';

class UserProfile extends Component {
  constructor(props){
        super(props);
        this.state={
          show : false,
          file: true,
          image: true
        };
        this.data={
        };
        this.userDetails={
          email:'',
          first_name:'',
          last_name:'',
          city:'',
          state:'',
          company:'',
          school:'',
          gender:'',
          contactNumber:'',
          selectedFile:'',
          profileImage:'',
          headline: '',
          profile_summary : '',
          zip_code:'',
          job_title: '',
          profileResume:'',
          skills:'',
          status:'Active'
        }
        this.savePhoto = this.savePhoto.bind(this);
    }
    componentWillMount(){
      this.userDetails={
        email:this.props.currentUser,
        first_name:this.props.currentUserDetails.first_name,
        last_name:this.props.currentUserDetails.last_name,
        headline:this.props.currentUserDetails.headline,
        profile_summary:this.props.currentUserDetails.profile_summary,
        education:this.props.currentUserDetails.education,
        company:this.props.currentUserDetails.company,
        school:this.props.currentUserDetails.school,
        job_title : this.props.currentUserDetails.job_title,
        city: this.props.currentUserDetails.city,
        country : this.props.currentUserDetails.country,
        state : this.props.currentUserDetails.state,
        experience :this.props.currentUserDetails.experience,
        zip_code : this.props.currentUserDetails.zip_code,
        skills: this.props.currentUserDetails.skills,
        status: this.props.currentUserDetails.status,
        student_flag: (this.props.currentUserDetails.student_flag!=1 ? false : true),
        profileResume:`${BASE_URL}/resumeFolder/`+this.props.currentUserDetails.applicant_id,
        profileImage:`${BASE_URL}/uploads/`+this.props.currentUserDetails.applicant_id+".jpeg",
      }
    }
   handleSave=(e)=> {
      e.preventDefault();
      this.userDetails.status = 'Active';
      this.userDetails.applicant_id = this.props.currentUserDetails.applicant_id;
      this.userDetails.student_flag = (this.props.currentUserDetails.student_flag!=1 ? false : true);
      this.userDetails.profileResume= `${BASE_URL}/resumeFolder/`+this.props.currentUserDetails.applicant_id+"/"+this.userDetails.resumeName;
      if(this.state.file && this.state.image) {
        this.props.profileUpdate(this.userDetails);
      }
      else{
        alert("Please upload file in correct format only");
      }
   }
   handleUpload=(event)=> {
         event.preventDefault();
         const photos=event.target.files[0];
         const applicantId=this.props.currentUserDetails.applicant_id;
         const fd=new FormData();
         fd.append('applicant_id',applicantId);
         fd.append('photos',photos,photos.name);
         if(photos.name.substring(photos.name.lastIndexOf('.')+1) == "pdf") {
         var contentType={
           headers : {
             "content-type" : "multipart/form-data"
           }
         }
         axios.post(`${BASE_URL}/uploadResume/uploadresume`,fd,contentType)
           .then(res=> {
             console.log("Response here: ", res);
             this.message=res.data.message
             this.userDetails.resumeName=res.data.filename;
             this.state.file = true;
             alert("Resume uploaded Successfully.!!!");
         })
       }
       else {
         this.state.file = false;
         alert("Please upload resume only in PDF format")
       }
 }
 handleImageUpload = (event)=> {
   event.preventDefault();
   const photos=event.target.files[0];
   const applicantId=this.props.currentUserDetails.applicant_id;
   const fd=new FormData();
   fd.append('applicant_id',applicantId);
   fd.append('photos',photos,photos.name);
   if(photos.name.substring(photos.name.lastIndexOf('.')+1) == "jpeg" || photos.name.substring(photos.name.lastIndexOf('.')+1) == "png" || photos.name.substring(photos.name.lastIndexOf('.')+1) == "jpg") {
   var contentType={
     headers : {
       "content-type" : "multipart/form-data"
     }
   }
   axios.post(`${BASE_URL}/users/uploadprofilepic`,fd,contentType)
     .then(res=> {
       console.log("Response here: ", res);
       this.message=res.data.message;
       this.state.image = true;
       alert("Image uploaded Successfully.!!!");
   })
  }
  else {
    this.state.image = false;
    alert("Please enter the image only in png or jpeg format");
  }
 }
 graphData =(e) => {
   e.preventDefault();
   this.data.applicant_id = this.props.currentUserDetails.applicant_id
   this.props.graphUpdate(this.data);
 }
 resumeView =(e) => {
   e.preventDefault();
   history.push('/resumeview');
 }
 savePhoto =(e) => {
   e.preventDefault();
   this.userDetails.applicant_id = this.props.currentUserDetails.applicant_id;
   this.props.profileUpdate(this.userDetails);
 }

  render() {
    if(!localStorage.getItem('servertoken'))
    {
      history.push('/')
    }
    let resume="";
    let workdetails="Working professional with experience of :" +this.userDetails.experience;
    if(this.props.currentUserDetails.resume_path!=null || this.props.currentUserDetails.resume_path!=undefined) {
      if(this.props.currentUserDetails.resume_path.length!=0){
        resume = this.props.currentUserDetails.resume_path[0].split(this.props.currentUserDetails.applicant_id)[1];
        resume = resume.replace("/", "");
        resume = resume.split('-')[1];
      }
    }
    if(this.props.currentUserDetails.company!=null && this.props.currentUserDetails.job_title !=null) {
       workdetails ="Works at  " +this.userDetails.company+ "  as " +this.props.currentUserDetails.job_title
    }

    return (
    		 <div>
          <Navbar />
          <div className="card-display">
            <div className='bg-light-orange dib br1 pa1 ma1 bw1 shadow-1'>
                  <img className="image-class" src="https://cdn.hipwallpaper.com/i/32/78/ZcPfiN.jpg"/>
                  <button className="image-btn" data-toggle="modal" data-target="#imageUpdateModal">
                    <img className="applicant-image"  src={this.userDetails.profileImage} alt="Edit photo"/>
                </button>
                <div className="modal fade" id="imageUpdateModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content custommodel">
                          <div className="modal-header">
                              <h3> Profile Photo </h3>
                              <img className="applicantimage-model"  src={this.userDetails.profileImage} alt="Avatar"/>
                              <input className="image-upload" type="file" name="photos" onChange={this.handleImageUpload}/>
                          </div>
                          <div className="modal-footer">
                              <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e) => {this.savePhoto(e)}}>Save changes</button>
                          </div>
                      </div>
                      </div>
                </div>
                  <h2 className="profile-name">{this.userDetails.first_name}  {this.userDetails.last_name} </h2>
                  <a href="" data-toggle="modal" data-target="#exampleModal">
                    <img className="edit-gly"src="https://imageog.flaticon.com/icons/png/512/61/61456.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF"/>
                  </a>

                  <br></br>
                  <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content custommodel">
                        <div className="modal-header">
                            <h3> Edit Intro </h3>
                            <br></br>
                            <img className="image-model" src="https://cdn.hipwallpaper.com/i/32/78/ZcPfiN.jpg"/>
                            <img className="applicant-model"  src={this.userDetails.profileImage} alt="Avatar"/>
                        </div>
                        <div className="modal-body">
                          <table>
                          <tbody>
                            <tr>
                              <td> <label className="label-class"> First Name* </label> </td>
                              <td> <label className="labellast-class"> Last Name* </label> </td>
                            </tr>
                            <tr>
                              <td>
                                  <input className="name-class" type="text" defaultValue={this.props.currentUserDetails.first_name}
                                    onChange={(event) => { this.userDetails.first_name = event.target.value}}/>
                              </td>
                              <td>
                                  <input className="lastname-class" type="text" defaultValue={this.props.currentUserDetails.last_name}
                                    onChange={(event) => { this.userDetails.last_name = event.target.value}}/>
                              </td>
                            </tr>
                            <br></br>
                            <tr>
                              <label className="label-class"> Headline*</label><br></br>
                            </tr>
                            <tr>
                              <textarea className="about-class"rows="3" cols="50" defaultValue={this.props.currentUserDetails.headline}
                              onChange={(event) => { this.userDetails.headline = event.target.value}}/>

                            </tr>
                            <tr>
                              <label className="label-class"> Education*</label>
                            </tr>
                            <tr>
                              <textarea className="about-class"rows="1" cols="50" defaultValue={this.props.currentUserDetails.education}
                              onChange={(event) => { this.userDetails.education = event.target.value}}/>

                            </tr>
                            <tr>
                              <label className="label-class"> School*</label>
                            </tr>
                            <tr>
                              <textarea className="about-class"rows="1" cols="50" defaultValue={this.props.currentUserDetails.school}
                            onChange={(event) => { this.userDetails.school = event.target.value}}/>
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
                              <td> <label className="label-class"> Country/Region * </label> </td>
                              <td> <label className="labellast-class"> Zip Code* </label> </td>
                            </tr>

                            <tr>
                              <td>
                                  <input className="name-class" type="text" defaultValue={this.props.currentUserDetails.country}
                                    onChange={(event) => { this.userDetails.country = event.target.value}}/>
                              </td>
                              <td>
                                  <input className="lastname-class" type="text"
                                    onChange={(event) => { this.userDetails.zip_code = event.target.value}}/>
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
                            <button type="button" onClick={(e) =>
                            (VALIDATION.checkValidState(this.userDetails.state) && VALIDATION.validatePinCode(this.userDetails.zip_code))==true?this.handleSave(e):''}
                             className="btn btn-primary">Save changes</button>

                        </div>
                </div>
            </div>
        </div>
                  <h4 className="profile-headline">{this.props.currentUserDetails.student_flag!=0? "Pursuing  " +this.props.currentUserDetails.education+ " at  " +this.props.currentUserDetails.school: workdetails}</h4>
                  <a href="#">
                    <img className="contact-gly"src="https://cdn2.vectorstock.com/i/1000x1000/72/26/phone-book-line-icon-contact-us-and-website-vector-14597226.jpg"/>
                  </a>
                  <a className="contact-link"> See Contact Info</a>
                  <a href="#">
                    <img className="connection-gly"src={connection}/>
                  </a>
                  <a className="connection-link"> See Connection</a>
                  <br></br>
                  <h5 className="profile-area">{this.props.currentUserDetails.city!=null? this.props.currentUserDetails.address : "Please tell us where you stay"}</h5>

                  <button type="button" data-toggle="modal" data-target="#exampleModal"className="btn-primary profile">Add Profile Section</button>
                  <button type="button" onClick={()=> {this.clickHandler()}} className="btn-primary profile">More...</button>
                  <hr/>
                  <h4 className="profile-headline">{this.props.currentUserDetails.headline!=null? this.props.currentUserDetails.headline : "Give a detail about your work experience or where studied"}</h4>
                  <br></br>
                  <div className="profile-resume">
                      <h5 className="resume-pdf">{this.props.currentUserDetails.resume_path!=undefined?<div> <a href="" onClick={(e) => { this.resumeView(e) }}>{resume}</a>
                        </div>:"Upload your resume"}</h5>
                      <img src="https://media.licdn.com/media-proxy/ext?w=800&amp;h=800&amp;f=n&amp;hash=bV4nJP4blI918BW90CLnyUCADDo%3D&amp;ora=1%2CaFBCTXdkRmpGL2lvQUFBPQ%2CxAVta5g-0R6plxVU0RAo5KuSpU6i4URDS8zfDW2-GGbFvo3FPSW3KJ6DOq2g91gQK34Ilxk2f7n5XTS3FZGhIonpLMFx3sGxcJfkMQJeOh171DEftYNoaU935MX3SP_4dSNM3O1RYWG3I762ZFBiW3BkqrrRedWPfQ" className="pv-treasury-item__image"/>
                  </div>
              </div>
            </div>
            <div className="card-profilestrength">
              <div className='bg-light-orange  br1 pa1 ma1 bw1 shadow-1'>
                    <br></br>
                    <h2 className="dashboard-name"> Your DashBoard </h2>
                    <br></br>
                    <h4 className="dashboard-name">Private to you</h4>
                    <br></br>
                    <table className="table">
                      <br></br>
                      <h4>Click on the link to view the visitors </h4>

                      <hr/>
                      <a href="" onClick={(e) => { this.graphData(e) }}> Who Viewed Your Profile</a>
                      <br></br><br></br>

                    </table>
                    <div className="table1">
                        <img className="career-image"src={connection}/>
                        <br></br><br></br>
                        <h4 className="details"> Career Advice </h4>
                        <br></br>
                        <h5 className="details">Participate in the career advice platform : <strong>Off</strong></h5>
                        <br></br>
                        <h5 className="details">Get career advice by conversing with other LinkedIn users who are leaders in their fields</h5>
                        <hr/>

                        <img className="career-image"src="https://cdn3.vectorstock.com/i/1000x1000/64/27/briefcase-icon-vector-21106427.jpg"/>
                        <br></br><br></br>
                        <h4 className="details"> Career interests</h4>
                        <br></br>
                        <h5 className="details">Let recruiters know you are open: <strong>Off</strong></h5>
                        <br></br>
                        <h5 className="details">Choose the types of opportunities you would like to be connected with</h5>
                        <hr/>
                        <img className="career-image"src="https://image.freepik.com/free-icon/dollar-bill_318-54875.jpg"/>
                        <br></br><br></br>
                        <h4 className="details"> Salary Insights</h4>
                        <br></br>
                        <h5 className="details">See how your salary compares to others in the community</h5>
                        <br></br><br></br><br></br>
                    </div>
              </div>
            </div>
            {this.props.currentUserDetails.experience!='' ? <Experience/>: ''}
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

function matchDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return bindActionCreators({profileUpdate: profileUpdate, graphUpdate : graphUpdate}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(UserProfile);
