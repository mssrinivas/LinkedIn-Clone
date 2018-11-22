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

class UserProfile extends Component {
  constructor(props){
        super(props);
        this.state={
          show : false
        }
        this.userDetails={
          email:'',
          firstName:'',
          lastName:'',
          city:'city',
          state:'',
          company:'company',
          school:'school',
          gender:'gender',
          contactNumber:'contactNumber',
          selectedFile:'',
          profileImage:'',
          headline: '',
          profile_summary : '',
          title: ''
        }
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
        profileImage:"http://localhost:3001/uploads/"+this.props.currentUserDetails.applicant_id+".jpeg"
      }
    }
   // clickHandler=()=> {
   //      this.userDetails.email=this.props.currentUser;
   //      this.props.updateProfileHandler(this.userDetails);
   //
   // }
   handleUpload=(event)=> {
         event.preventDefault();
         const photos=event.target.files[0];
         const applicantId=this.props.currentUserDetails.applicant_id;
         const fd=new FormData();
         fd.append('applicant_id',applicantId);
         fd.append('photos',photos,photos.name);
         var contentType={
           headers : {
             "content-type" : "multipart/form-data"
           }
         }
         axios.post('http://localhost:3001/uploadResume/uploadresume',fd,contentType)
           .then(res=> {
             console.log("Response here: ", res);
             this.message=res.data.message
             alert("Resume uploaded Successfully.!!!");
         })
 }
  render() {
    let pathImage="http://localhost:3001/uploads/"+this.props.currentUserDetails.applicant_id+".jpeg"
    return (
    		 <div>
          <Navbar />
          <div className="card-display">
            <div className='bg-light-orange dib br1 pa1 ma1 bw1 shadow-1'>

                  <img className="image-class" src="https://cdn.hipwallpaper.com/i/32/78/ZcPfiN.jpg"/>
                  <img className="applicant-image"  src={this.userDetails.profileImage} alt="Avatar"/>
                  <h2 className="profile-name">{this.userDetails.firstName}  {this.userDetails.lastName} </h2>
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
                                    onChange={(event) => { this.userDetails.firstName = event.target.value}}/>
                              </td>
                              <td>
                                  <input className="lastname-class" type="text" defaultValue={this.props.currentUserDetails.last_name}
                                    onChange={(event) => { this.userDetails.lastName = event.target.value}}/>
                              </td>
                            </tr>
                            <br></br>
                            <tr>
                              <label className="label-class"> Headline*</label><br></br><br></br>
                            </tr>
                            <tr>
                              <textarea className="about-class"rows="3" cols="50" defaultValue={this.props.currentUserDetails.headline}
                              onChange={(event) => { this.userDetails.headline = event.target.value}}/>
                               <br></br><br></br>
                            </tr>
                            <tr>
                              <label className="label-class"> Education*</label><br></br><br></br>
                            </tr>
                            <tr>
                              <textarea className="about-class"rows="1" cols="50" defaultValue={this.props.currentUserDetails.education}
                              onChange={(event) => { this.userDetails.education = event.target.value}}/>
                               <br></br><br></br>
                            </tr>
                            <tr>
                              <label className="label-class"> Job Title*</label><br></br><br></br>
                            </tr>
                            <tr>
                              <textarea className="about-class"rows="1" cols="50" defaultValue={this.props.currentUserDetails.title}
                              onChange={(event) => { this.userDetails.title = event.target.value}}/>
                               <br></br><br></br>
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
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e) => { this.handleSave(e) }}>Save changes</button>
                        </div>
                </div>
            </div>
        </div>
                  <h4 className="profile-headline">{this.userDetails.title!=null?this.userDetails.title + "at" +this.userDetails.company : }</h4>
                  <a href="#">
                    <img className="contact-gly"src="https://cdn2.vectorstock.com/i/1000x1000/72/26/phone-book-line-icon-contact-us-and-website-vector-14597226.jpg"/>
                  </a>
                  <a className="contact-link"> See Contact Info</a>
                  <a href="#">
                    <img className="connection-gly"src={connection}/>
                  </a>
                  <a className="connection-link"> See Connection</a>
                  <br></br>
                  <h5 className="profile-area">San Francisco Bay Area</h5>
                  <button type="button" onClick={()=> {this.clickHandler()}} className="btn-primary profile">Add Profile Section</button>
                  <button type="button" onClick={()=> {this.clickHandler()}} className="btn-primary profile">More...</button>
                  <hr/>
                  <h4 className="profile-headline">I like to solve real world problems using computer programs. I'm equally interested in building and breaking things. That's why I feel that a career as a Software Developer is perfect for me.</h4>
                  <br></br>
                  <div className="profile-resume">
                      <h5 className="resume-pdf">Surabhi_Sinha_Resume.pdf</h5>
                      <img src="https://media.licdn.com/media-proxy/ext?w=800&amp;h=800&amp;f=n&amp;hash=bV4nJP4blI918BW90CLnyUCADDo%3D&amp;ora=1%2CaFBCTXdkRmpGL2lvQUFBPQ%2CxAVta5g-0R6plxVU0RAo5KuSpU6i4URDS8zfDW2-GGbFvo3FPSW3KJ6DOq2g91gQK34Ilxk2f7n5XTS3FZGhIonpLMFx3sGxcJfkMQJeOh171DEftYNoaU935MX3SP_4dSNM3O1RYWG3I762ZFBiW3BkqrrRedWPfQ" className="pv-treasury-item__image"/>
                  </div>
              </div>
            </div>
            <div className="card-profilestrength">
              <div className='bg-light-orange  br1 pa1 ma1 bw1 shadow-1'>
                    <h2 className="profile-name">{this.userDetails.firstName}  {this.userDetails.lastName} </h2>
                    <br></br>
                    <h4 className="profile-headline">System Engineer at TCS</h4>
                    <br></br>
                    <h5 className="profile-area">San Francisco Bay Area</h5>
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

// function matchDispatchToProps(dispatch){
//     console.log("Dispatch",dispatch);
//     return bindActionCreators({updateProfileHandler: updateProfileHandler}, dispatch);
// }

export default connect(mapStateToProps,null)(UserProfile);
