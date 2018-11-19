import React,{ Component } from 'react';
import './applicantprofile.css';
import axios from 'axios';
import 'tachyons';
// import ProfileHeader from './profileheader';
import * as UTIL from './../../util/utils';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import {updateProfileHandler} from './../../api/Api';
import * as VALIDATION from './../../util/validation';

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
    // componentWillMount(){
    //   console.log("value on mount: ",this.props.userProfileDetails.userDetails[0].first_name);
    //   this.userDetails={
    //     email:this.props.currentUser,
    //     firstName:this.props.userProfileDetails.userDetails[0].first_name,
    //     lastName:this.props.userProfileDetails.userDetails[0].last_name,
    //     aboutMe:this.props.userProfileDetails.userDetails[0].about_me,
    //     city:this.props.userProfileDetails.userDetails[0].city,
    //     company:this.props.userProfileDetails.userDetails[0].company,
    //     school:this.props.userProfileDetails.userDetails[0].school,
    //     hometown:this.props.userProfileDetails.userDetails[0].hometown,
    //     language:this.props.userProfileDetails.userDetails[0].lang,
    //     gender:this.props.userProfileDetails.userDetails[0].gender,
    //     contactNumber:this.props.userProfileDetails.userDetails[0].contact_number,
    //     profileImage:"http://localhost:3001/uploads/"+this.props.currentUser+".jpeg"
    //   }
    // }
   // clickHandler=()=> {
   //      this.userDetails.email=this.props.currentUser;
   //      this.props.updateProfileHandler(this.userDetails);
   //
   // }
   // handleUpload=(event)=> {
   //            this.userDetails.selectedFile=event.target.files[0];
   //            console.log("File uploaded: ",this.userDetails.selectedFile);
   //
   //  }
   //  imageHandler=(event)=> {
   //      const fd=new FormData();
   //      fd.append('email',this.props.currentUser);
   //      fd.append('photos',this.userDetails.selectedFile,this.userDetails.selectedFile.name);
   //      axios.post('http://localhost:3001/users/uploadprofilepic',fd)
   //        .then(res=> {
   //          console.log("Response here: ", res);
   //          alert("Profile Image uploaded successfully");
   //          this.userDetails.profileImage="http://localhost:3001/uploads/"+this.props.currentUser+".jpeg";
   //          console.log("Profile image path:", this.userDetails.profileImage);
   //        })
   //    }
  render() {
    return (
    		 <div>
            <div className='bg-light-orange dib br3 pa3 ma2 bw2 shadow-5'>
                  <img className="image-class" src="https://cdn.hipwallpaper.com/i/32/78/ZcPfiN.jpg"/>
                  <img className="applicant-image" src="https://cdn4.iconfinder.com/data/icons/Pretty_office_icon_part_2/256/man.png" alt="Avatar"/>
                  
            </div>
                    <form className="profile-form" enctype="multipart/form-data">
                      <label className="label-class"> First Name </label><br></br>
                        <input className="name-class" type="text"
                            onChange={(event) => { this.userDetails.firstName = event.target.value}}/>
                         <br></br><br></br>
                         <label className="label-class"> Last Name </label><br></br>
                         <input className="name-class" type="text"
                            onChange={(event) => { this.userDetails.lastName = event.target.value}}/>
                         <br></br><br></br>
                         <br></br>
                          <label className="label-class"> About me </label><br></br><br></br>
                        <textarea className="about-class"rows="6"
                          onChange={(event) => { this.userDetails.aboutMe = event.target.value}}/>
                           <br></br><br></br>
                            <label className="label-class"> City</label><br></br>
                           <input className="name-class" type="text"
                            onChange={(event) => { this.userDetails.city = event.target.value}}/>
                                     <br></br><br></br>
                            <label className="label-class"> Company </label><br></br>
                            <input className="name-class" type="text"
                            onChange={(event) => { this.userDetails.company = event.target.value}}/>
                                    <br></br><br></br>
                            <label className="label-class"> School </label><br></br>
                            <input className="name-class" type="text"
                            onChange={(event) => { this.userDetails.school = event.target.value}}/>
                                    <br></br><br></br>
                             <label className="label-class"> Hometown </label><br></br>
                            <input className="name-class" type="text"
                            onChange={(event) => { this.userDetails.hometown = event.target.value}}/>
                                     <br></br><br></br>
                             <label className="label-class"> Language</label><br></br>
                            <input className="name-class" type="text"
                            onChange={(event) => { this.userDetails.language = event.target.value}}/>
                                    <br></br><br></br>
                             <label className="label-class"> Contact Number</label><br></br>
                             <input className="name-class" type="text"
                             onChange={(event) => { this.userDetails.contactNumber = event.target.value}}/>
                                    <br></br><br></br>
                               <br></br><br></br>
                               <button type="button" onClick={()=> {this.clickHandler()}} className="btn-class save">Save Changes</button>
                               <input className="image-upload" type="file" name="photos"/>
                               <button type="button" className="btn-class upload" >Upload</button>
                      </form>
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

// function matchDispatchToProps(dispatch){
//     console.log("Dispatch",dispatch);
//     return bindActionCreators({updateProfileHandler: updateProfileHandler}, dispatch);
// }

export default connect(mapStateToProps,null)(UserProfile);
