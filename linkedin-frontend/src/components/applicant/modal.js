import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import './model.css';

class Modal extends Component {
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
          selectedFile:'',
          profileImage:''
        }
    }
    componentWillMount(){
      this.userDetails={
        email:this.props.currentUser,
        firstName:this.props.currentUserDetails.first_name,
        lastName:this.props.currentUserDetails.last_name,
        headline:this.props.currentUserDetails.profile_summary,
        education:this.props.currentUserDetails.education,
        company:this.props.currentUserDetails.company,
        school:this.props.currentUserDetails.school,
        profileImage:"http://localhost:3001/uploads/"+this.props.currentUser+".jpeg"
      }
    }
    render() {
      if(!this.props.show) {
        return null;
      }
        return (
          <div className="modal fade custommodel" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          {alert(this.props.data.firstName)}
          <div className="modal-dialog custommodel" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <img className="image-model" src="https://cdn.hipwallpaper.com/i/32/78/ZcPfiN.jpg"/>
                    <img className="applicant-model"  src={this.userDetails.profileImage} alt="Avatar"/>
                </div>
                <div className="modal-body">
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
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e) => { this.handleSave(e) }}>Save changes</button>
                </div>
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
export default connect(mapStateToProps,null)(Modal);
