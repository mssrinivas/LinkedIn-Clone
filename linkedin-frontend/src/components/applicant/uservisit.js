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
import {BASE_URL} from './../constants/constants.js';
import swal from 'sweetalert';
class UserVisit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error:'',
      applicant_id:this.props.clickedUserDetails.applicant_id,
      viewer_applicant_id:this.props.currentUserDetails.applicant_id,
      message:''
    }
  }
  resumeView =(e) => {
    e.preventDefault();
    history.push('/resumeview');
  }
 componentDidMount() {
   this.setState({
     applicant_id: this.props.clickedUserDetails.applicant_id,
     viewer_applicant_id : this.props.currentUserDetails.applicant_id
   })
   axios.post(`${BASE_URL}/users/userViewTrace`,this.state)
     .then(res=> {
       console.log("Response here: ", res);
       this.setState({
         message:res.data.message
       })
   }).catch((error)=>{
       this.setState({error : "Connection timed out"});
   })
 }

 RequestConnection = (email) => {
  console.log("EMAIL IS",email)
  console.log("current user IS",this.props.currentUser)
  var data={
      from:this.props.currentUser,
      fromDetails:this.props.currentUserDetails,
      to:email,
  }
  axios.post(`${BASE_URL}/user/requestconnection`,data)
  .then(function (response) {
      console.log("response",response.data.notifData.body)
      // this.setState({
      //     buttonDisabled:false
      // })
      swal("Request Sent", "Request Sent", 'success');
  })
}
  render() {
    if(!localStorage.getItem('servertoken'))
    {
      history.push('/')
    }
    let resume=""
    if(this.props.clickedUserDetails.resume_path!=null || this.props.clickedUserDetails.resume_path!=undefined) {
      if(this.props.clickedUserDetails.resume_path.length!=0){
        resume = this.props.clickedUserDetails.resume_path[0].split(this.props.clickedUserDetails.applicant_id)[1];
        resume = resume.replace("/", "");
        resume = resume.split('-')[1];
      }
    }
debugger
    var connectButton=null;
    if(this.props.currentUser.length>0){
    var pendingUsers=this.props.currentUserDetails.pending;
    var waitingUsers=this.props.currentUserDetails.waiting;
    var friends=this.props.currentUserDetails.connections;

    if(this.props.clickedUserDetails.email==this.props.currentUser){
      connectButton=null;
    }
    if(pendingUsers.length==0 && waitingUsers.length==0 && friends.length==0 && !(this.props.clickedUserDetails.email==this.props.currentUser))
    {
      console.log("hii...");
      connectButton=<button type="button" data-toggle="modal" data-target="#exampleModal"className="btn-primary profile" onClick={()=>this.RequestConnection(this.props.clickedUserDetails.email)}>Connect</button>
    }
   else if(friends.length>0){
    console.log("hii.2..")
    for(var i=0;i<friends.length;i++)
    {
      console.log("loop1",friends[i]===this.props.clickedUserDetails.email)
      console.log(friends[i].email,"--->",this.props.clickedUserDetails.email)
      if(friends[i].email==this.props.clickedUserDetails.email)
      {
        console.log("Matched friends")
        connectButton= <button type="button" data-toggle="modal" data-target="#exampleModal"className="btn-primary profile" disabled>You are Friends</button>
      }
      else if(this.props.clickedUserDetails.email==this.props.currentUser){
        connectButton=null;
      }
      else{
        connectButton=<button type="button" data-toggle="modal" data-target="#exampleModal"className="btn-primary profile" onClick={()=>this.RequestConnection(this.props.clickedUserDetails.email)}>Connect</button>
      }
    }
  }

   if(waitingUsers.length>0){
    console.log("hii..3.")
    for(var i=0;i<waitingUsers.length;i++)
    {
      console.log("loop2")
      if(waitingUsers[i]==this.props.clickedUserDetails.email)
      {
        console.log("already send freind request")
        connectButton= <button type="button" data-toggle="modal" data-target="#exampleModal"className="btn-primary profile" disabled>Reuqested Connection</button>
      }
      else if(this.props.clickedUserDetails.email==this.props.currentUser){
        connectButton=null;
      }
    }
    }
   if(pendingUsers.length>0){
      console.log("hii..3.")
      for(var i=0;i<pendingUsers.length;i++)
      {
        console.log("loop2")
        if(pendingUsers[i].email==this.props.clickedUserDetails.email)
        {
          console.log("already send freind request")
          connectButton= <button type="button" data-toggle="modal" data-target="#exampleModal"className="btn-primary profile" disabled>Pending Request</button>
        }
        else if(this.props.clickedUserDetails.email==this.props.currentUser){
          connectButton=null;
        }
        else{
          connectButton=<button type="button" data-toggle="modal" data-target="#exampleModal"className="btn-primary profile" onClick={()=>this.RequestConnection(this.props.clickedUserDetails.email)}>Connect</button>
        }
      }
      }
  }

    return (
    		 <div>
          <Navbar />
          <div className="card-display">
            <div className='bg-light-orange dib br1 pa1 ma1 bw1 shadow-1'>
                  <img className="image-class" src="https://cdn.hipwallpaper.com/i/32/78/ZcPfiN.jpg"/>
                  <button className="image-btn" data-toggle="modal" data-target="#imageUpdateModal">
                    <img className="applicant-image"  src={this.props.clickedUserDetails.profile_img} alt="Edit photo"/>
                </button>
                  <h2 className="profile-name">{this.props.clickedUserDetails.first_name}  {this.props.clickedUserDetails.last_name} </h2>

                  <br></br>
                  <h4 className="profile-headline">{this.props.clickedUserDetails.student_flag!=0? "Pursuing  " +this.props.clickedUserDetails.education+ " at  " +this.props.currentUserDetails.school: "Works at  " +this.props.clickedUserDetails.company+ "  as " +this.props.currentUserDetails.job_title}</h4>
                    <img className="contact-gly"src="https://cdn2.vectorstock.com/i/1000x1000/72/26/phone-book-line-icon-contact-us-and-website-vector-14597226.jpg"/>
                  <a className="contact-link"> See Contact Info</a>
                  <a href="#">
                    <img className="connection-gly"src={connection}/>
                  </a>
                  <a className="connection-link"> See Connection</a>
                  <br></br>
                  <h5 className="profile-area">{this.props.clickedUserDetails.city!=null? this.props.clickedUserDetails.address : "Please tell us where you stay"}</h5>
                  {connectButton}

                  <button type="button" data-toggle="modal" data-target="#exampleModal"className="btn-primary profile">Add Profile Section</button>
                  <button type="button" onClick={()=> {this.clickHandler()}} className="btn-primary profile">More...</button>
                  <hr/>
                  <h4 className="profile-headline">{this.props.clickedUserDetails.headline!=null? this.props.clickedUserDetails.headline : "Give a detail about your work experience or where studied"}</h4>
                  <br></br>
                  <div className="profile-resume">
                      <h5 className="resume-pdf">{this.props.clickedUserDetails.resume_path!=undefined?<div> <a href="" onClick={(e) => { this.resumeView(e) }}>{resume}</a>
                        </div>:"No Profile Uploaded"}</h5>
                      <img src="https://media.licdn.com/media-proxy/ext?w=800&amp;h=800&amp;f=n&amp;hash=bV4nJP4blI918BW90CLnyUCADDo%3D&amp;ora=1%2CaFBCTXdkRmpGL2lvQUFBPQ%2CxAVta5g-0R6plxVU0RAo5KuSpU6i4URDS8zfDW2-GGbFvo3FPSW3KJ6DOq2g91gQK34Ilxk2f7n5XTS3FZGhIonpLMFx3sGxcJfkMQJeOh171DEftYNoaU935MX3SP_4dSNM3O1RYWG3I762ZFBiW3BkqrrRedWPfQ" className="pv-treasury-item__image"/>
                  </div>
              </div>
            </div>
            {this.props.clickedUserDetails.experience!='' ? <Experience/>: ''}
    		 </div>
        );
	  }
	}

  function mapStateToProps(state) {
    console.log("State",state);
      return {
         currentUser: state.LoginReducer.current_user,
         currentUserDetails: state.LoginReducer.currentUserDetails,
         userProfileDetails: state.LoginReducer.userProfileDetails,
         clickedUserDetails: state.LoginReducer.clickedUserDetails
      };
  }

export default connect(mapStateToProps,null)(UserVisit);
