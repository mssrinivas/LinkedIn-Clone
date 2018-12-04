import React,{Component} from 'react';
import './applicantprofile.css';
import {Redirect} from 'react-router-dom';
import Navigation from './../JobPostings/Navigation';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from 'react-stepper-horizontal';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import {Launcher} from 'react-chat-window'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import axios from 'axios';
import {profileUpdate} from './../../api/Api';
import Navbar from './../navbar/Navbar.jsx';
import { Container, Button, Row, Col, Step, Input } from 'mdbreact';
import {history} from "../../util/utils";
import {BASE_URL} from './../../components/constants/constants.js';

class UserProfileFirst extends Component {
  constructor(props) {
    super(props);
    this.state= {
      student_flag : true,
      communityFlag : false,
      headerMessage :'Your profile helps you discover the right people and opportunities',
      photoFlag : false,
      profile_img : ''
    }
    this.userDetails={
      school : '',
      education : '',
      skills : '',
      experience : '',
      email : '',
      photo : '',
      profile_img : '',
      status : 'Active',
      student_flag : true
    }
    this.onClickStudent =  this.onClickStudent.bind(this);
    this.onClickProfessional = this.onClickProfessional.bind(this);
    this.onClickCommunity = this.onClickCommunity.bind(this);
    this.onClickPhotos = this.onClickPhotos.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
  }
  onClickStudent = () => {
    this.setState({
      student_flag: true,
      headerMessage: 'Your profile helps you discover the right people and opportunities'
    });
    this.userDetails.student_flag = this.state.student_flag;
  }
  onClickProfessional = () => {
    this.setState({
      student_flag: false,
      headerMessage: 'Your profile helps you discover the right people and opportunities'
    });
  }
  onClickCommunity = () => {
    this.setState({
      communityFlag: true,
      headerMessage: 'Add your email contacts to see who you already know on LinkedIn'

    });
  }
  onClickPhotos = () => {
    this.setState({
      photoFlag:true,
      headerMessage: 'Adding a photo helps people recognize you'
    })
  }
  componentWillMount(){
    this.userDetails.applicant_id = this.props.currentUserDetails.applicant_id;
    this.userDetails.first_name = this.props.currentUserDetails.user_Details.first_name;
    this.userDetails.last_name = this.props.currentUserDetails.user_Details.last_name;
    this.userDetails.email = this.props.currentUser;
  }
  handleUpload=(event)=> {
        event.preventDefault();
        var photos=event.target.files[0];
        var applicant_id=this.props.currentUserDetails.applicant_id;
        var fd=new FormData();
        fd.append('applicant_id',applicant_id);
        fd.append('photos',photos);
        var contentType={
          headers : {
            "content-type" : "multipart/form-data"
          }
        }
        axios.post(`${BASE_URL}/users/uploadprofilepic`, fd,contentType)
          .then(res=> {
            console.log("Response here: ", res);
            this.message=res.data.message
            alert("Image uploaded Successfully.!!!");
        })
}
onClickUpload = () => {
      this.setState({
          profile_img: `${BASE_URL}/uploads`+this.props.currentUserDetails.applicant_id
      });
  }
onClickEmail  = () => {
  alert("Email Updated");
}
onClickContinue = () => {
  alert("Click on Submit to view the jobs");
}
onSubmitClick(e) {
  e.preventDefault();
  this.userDetails.first_name = this.props.currentUserDetails.user_Details.first_name;
  this.userDetails.last_name = this.props.currentUserDetails.user_Details.last_name;
  this.userDetails.email = this.props.currentUserDetails.user_Details.email;
  this.userDetails.applicant_id = this.props.currentUserDetails.applicant_id;
  this.userDetails.profile_img = `${BASE_URL}/uploads`+this.props.currentUserDetails.applicant_id+".jpeg";
  this.userDetails.student_flag = this.state.student_flag;
  this.props.profileUpdate(this.userDetails);
}
  render ()
  {
    if(!localStorage.getItem('servertoken'))
    {
      history.push('/')
    }
    const buttonStyle = { width: 200, padding: 16, textAlign: 'center', margin: '0 auto', marginTop: 32 };
    let Studentcheck = null;
    let Communitycheck = null;
    let Photocheck = null;
    if(this.state.student_flag === true)
    {
      Studentcheck = (
        <div>
          <label className="school-label"> School or College/University* </label><br></br>
          <input type="text" className="school-text"
          onChange={(userinput) => {this.userDetails.school=userinput.target.value}}/>
          <br></br>
          <label className="education-label"> Education* </label><br></br>
          <input type="text" className="education-text"
          onChange={(userinput) => {this.userDetails.education=userinput.target.value}}/>
          <br></br><br></br>
          &nbsp;<button type="button" className="btn btn-primary educationbutton" onClick={this.onClickProfessional}>I am not a Student</button>
          <br></br>
          &nbsp;<button type="button" className="btn btn-primary educationbutton1" onClick={this.onClickCommunity}>Continue</button>
          <br></br><br></br>
        </div>)
    }
    if(this.state.student_flag === false)
    {
      Studentcheck = (
        <div>
          <label className="skill-label"> Skills* </label><br></br>
          <input type="text" className="skill-text"
          onChange={(userinput) => {this.userDetails.skills=userinput.target.value}}/>
          <br></br>
          <label className="experience-label"> Experience* </label><br></br>
          <input type="number" min="0"className="experience-text"
          onChange={(userinput) => {this.userDetails.experience=userinput.target.value}}/>
          <br></br><br></br>
          &nbsp;<button type="button" class="btn btn-primary educationbutton" onClick={this.onClickStudent}>I am a Student</button>
          <br></br>
          &nbsp;<button type="button" className="btn btn-primary educationbutton1" onClick={this.onClickCommunity}>Continue</button>
          <br></br><br></br>
        </div>)
    }
    if(this.state.communityFlag === true)
    {
      Communitycheck = (
        <div>
        <div className="cardstudent1">
          <h1> Email </h1>
          <div className='bg-light-orange dib br1 pa1 ma1 bw1 shadow-1'>
          <div className="fake-input">
              <input className="fake-text" type="text" defaultValue={this.props.currentUser}
              onChange={(userinput) => {this.userDetails.email=userinput.target.value}}/>
              <img className= "fake-image" src="https://www.seoclerk.com/pics/want55393-1MZsWy1507745659.png"/>
          </div>
          <br></br><br></br>
          &nbsp;<button type="button" className="btn btn-primary communitybutton" onClick={this.onClickEmail}>Update Email</button>
          &nbsp;<button type="button" className="btn btn-primary communitybutton" onClick={this.onClickPhotos}>Continue</button>
          <br></br><br></br>
          </div>
          </div>
        </div>)
    }
    if(this.state.photoFlag === true)
    {
      Photocheck = (
        <div>
        <div className="cardstudent2">
          <h1 className="photo-header"> Photo </h1>
          <div className='bg-light-orange dib br1 pa1 ma1 bw1 shadow-1'>
          <div class="image-selector__selector-icon image-selector__selector-icon--add-media"></div>
          <input className="upload" type="file" name="photos" onChange={this.handleUpload}/>
          <br></br><br></br><br></br><br></br><br></br><br></br>
          <button type="button" className="btn btn-primary photobutton" onClick={this.onClickUpload}>Upload</button>
          <br></br><br></br>
          &nbsp;<button type="button" className="btn btn-primary photobutton1" onClick={this.onClickContinue}>Continue</button>
          </div>
          </div>
        </div>)
    }
    return (
            <div>
              <Navbar/>
            <div style={ buttonStyle } >
              <h3 className="user-first"> {this.state.headerMessage} </h3>
              <div className="cardstudent">
              <h1> Profile </h1>
                <div className='bg-light-orange dib br1 pa1 ma1 bw1 shadow-1'>
                    {Studentcheck}
                </div>
                {this.state.communityFlag!=false? Communitycheck:''}
                {this.state.photoFlag!=false? Photocheck:''}
              </div>
              &nbsp;<button type="button" className="btn btn-primary submitbutton" onClick={this.onSubmitClick}>Submit</button>

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

function matchDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return bindActionCreators({profileUpdate: profileUpdate}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(UserProfileFirst);
