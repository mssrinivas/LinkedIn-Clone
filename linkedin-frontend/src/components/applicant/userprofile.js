import React,{ Component } from 'react';
import './../images/profile.css';
import axios from 'axios';
import ProfileHeader from './profileheader';
import Person from './../images/peopleicon1.png';
import * as UTIL from './../util/utils';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {updateProfileHandler} from './../api/Api';
import * as VALIDATION from './../util/validation';

class UserProfile extends Component {
  constructor(props){
        super(props);
        this.userDetails={
          email:'',
          firstName:'',
          lastName:'',
          aboutMe:'aboutMe',
          city:'city',
          company:'company',
          school:'school',
          hometown:'hometown',
          language:'language',
          gender:'gender',
          contactNumber:'contactNumber',

          selectedFile:''
        }
    }
    componentWillMount(){
      console.log("value on mount: ",this.props.userProfileDetails.userDetails[0].first_name);
      this.userDetails={
        email:this.props.currentUser,
        firstName:this.props.userProfileDetails.userDetails[0].first_name,
        lastName:this.props.userProfileDetails.userDetails[0].last_name,
        aboutMe:this.props.userProfileDetails.userDetails[0].about_me,
        city:this.props.userProfileDetails.userDetails[0].city,
        company:this.props.userProfileDetails.userDetails[0].company,
        school:this.props.userProfileDetails.userDetails[0].school,
        hometown:this.props.userProfileDetails.userDetails[0].hometown,
        language:this.props.userProfileDetails.userDetails[0].lang,
        gender:this.props.userProfileDetails.userDetails[0].gender,
        contactNumber:this.props.userProfileDetails.userDetails[0].contact_number,
        profileImage:"http://localhost:3001/uploads/"+this.props.currentUser+".jpeg"
      }
    }
   clickHandler=()=> {
        this.userDetails.email=this.props.currentUser;
        this.props.updateProfileHandler(this.userDetails);

   }
   handleUpload=(event)=> {
              this.userDetails.selectedFile=event.target.files[0];
              console.log("File uploaded: ",this.userDetails.selectedFile);

    }
    imageHandler=(event)=> {
        const fd=new FormData();
        fd.append('email',this.props.currentUser);
        fd.append('photos',this.userDetails.selectedFile,this.userDetails.selectedFile.name);
        axios.post('http://localhost:3001/users/uploadprofilepic',fd)
          .then(res=> {
            console.log("Response here: ", res);
            alert("Profile Image uploaded successfully");
            this.userDetails.profileImage="http://localhost:3001/uploads/"+this.props.currentUser+".jpeg";
            console.log("Profile image path:", this.userDetails.profileImage);
          })
      }
  render() {
    return (
    		 <div>
          <div className="userprofile-header">
              <ProfileHeader/>
          </div>
                <div className="tab-pane profile">
                <h1 className="profile-header"> Profile Information </h1>
                  <img className="image-class" src={this.userDetails.profileImage} alt={this.props.currentUser}/>
                    <form className="profile-form" enctype="multipart/form-data">
                      <label className="label-class"> First Name </label><br></br>
                        <input className="name-class" type="text" defaultValue={this.props.userProfileDetails.firstName!=undefined ? this.props.userProfileDetails.firstName:this.props.userProfileDetails.userDetails[0].first_name}
                            onChange={(event) => { this.userDetails.firstName = event.target.value}}/>
                         <br></br><br></br>
                         <label className="label-class"> Last Name </label><br></br>
                         <input className="name-class" type="text" defaultValue={this.props.userProfileDetails.lastName!=undefined ? this.props.userProfileDetails.lastName:this.props.userProfileDetails.userDetails[0].last_name}
                            onChange={(event) => { this.userDetails.lastName = event.target.value}}/>
                         <br></br><br></br>
                         <br></br>
                          <label className="label-class"> About me </label><br></br><br></br>
                        <textarea className="about-class"rows="6"  defaultValue={this.props.userProfileDetails.aboutMe!=undefined ? this.props.userProfileDetails.aboutMe:this.props.userProfileDetails.userDetails[0].about_me}
                          onChange={(event) => { this.userDetails.aboutMe = event.target.value}}/>
                           <br></br><br></br>
                            <label className="label-class"> City</label><br></br>
                           <input className="name-class" type="text" defaultValue={this.props.userProfileDetails.city!=undefined ? this.props.userProfileDetails.city:this.props.userProfileDetails.userDetails[0].city}
                            onChange={(event) => { this.userDetails.city = event.target.value}}/>
                                     <br></br><br></br>
                            <label className="label-class"> Company </label><br></br>
                            <input className="name-class" type="text" defaultValue={this.props.userProfileDetails.company!=undefined ? this.props.userProfileDetails.company:this.props.userProfileDetails.userDetails[0].company}
                            onChange={(event) => { this.userDetails.company = event.target.value}}/>
                                    <br></br><br></br>
                            <label className="label-class"> School </label><br></br>
                            <input className="name-class" type="text"  defaultValue={this.props.userProfileDetails.school!=undefined ? this.props.userProfileDetails.school:this.props.userProfileDetails.userDetails[0].school}
                            onChange={(event) => { this.userDetails.school = event.target.value}}/>
                                    <br></br><br></br>
                             <label className="label-class"> Hometown </label><br></br>
                            <input className="name-class" type="text" defaultValue={this.props.userProfileDetails.hometown!=undefined ? this.props.userProfileDetails.hometown:this.props.userProfileDetails.userDetails[0].hometown}
                            onChange={(event) => { this.userDetails.hometown = event.target.value}}/>
                                     <br></br><br></br>
                             <label className="label-class"> Language</label><br></br>
                            <input className="name-class" type="text" defaultValue={this.props.userProfileDetails.language!=undefined ?this.props.userProfileDetails.language:this.props.userProfileDetails.userDetails[0].lang}
                            onChange={(event) => { this.userDetails.language = event.target.value}}/>
                                    <br></br><br></br>
                             <label className="label-class"> Contact Number</label><br></br>
                             <input className="name-class" type="text"defaultValue={this.props.userProfileDetails.contactNumber!=undefined ? this.props.userProfileDetails.contactNumber:this.props.userProfileDetails.userDetails[0].contact_number}
                             onChange={(event) => { this.userDetails.contactNumber = event.target.value}}/>
                                    <br></br><br></br>

                            <select className="gender-type"  defaultValue={this.props.userProfileDetails.gender!=undefined ?this.props.userProfileDetails.gender: this.props.userProfileDetails.userDetails[0].gender}
                            onChange={(event) => { this.userDetails.gender = event.target.value}} name="Gender">
                                  <option value={this.props.userProfileDetails.gender}>{this.props.userProfileDetails.gender!=undefined ?this.props.userProfileDetails.gender: this.props.userProfileDetails.userDetails[0].gender}</option><option value="Male">Male</option><option value="Female">Female</option>
                            </select>
                               <br></br><br></br>
                               <button type="button" onClick={()=> {(VALIDATION.validateName(this.userDetails.firstName,"First Name") && VALIDATION.validateName(this.userDetails.lastName,"Last Name") && VALIDATION.validatePhone(this.userDetails.contactNumber)  )==true?
                                 this.clickHandler():''}} className="btn-class save">Save Changes</button>
                               <input className="image-upload" type="file" name="photos" onChange={this.handleUpload}/>
                               <button type="button" onClick={this.imageHandler} className="btn-class upload" >Upload</button>

                      </form>
                  </div>
    		 </div>
        );
	  }
	}

  function mapStateToProps(state) {
    console.log("State",state);
      return {
         currentUser: state.LoginReducer.currentUser,
         currentUserDetails: state.LoginReducer.currentUserDetails,
         userProfileDetails: state.LoginReducer.userProfileDetails
      };
  }

function matchDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return bindActionCreators({updateProfileHandler: updateProfileHandler}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(UserProfile);
