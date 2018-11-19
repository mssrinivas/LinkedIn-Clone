import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import {customApplyJob} from './../../api/Api';
import './apply.css';
import {BASE_URL} from './../../components/constants/constants.js';
var swal = require('sweetalert')
class customApply extends Component {
    constructor(props){
        //Call the constrictor of Super class i.e The Component
super(props);
        //maintain the state required for this component
this.state = {
    firstname : "",
    lastname : "",
    email : "",
    contact : "",
    address: "",
    hear : "",
    gender : "",
    race : "",
    veteran : "",
    disability : "",
    selectedFile : "",
    cover : ""
}
        //Bind the handlers to this class
this.fnameChangeHandler = this.fnameChangeHandler.bind(this);
this.lnameChangeHandler = this.lnameChangeHandler.bind(this);
this.emailChangeHandler = this.emailChangeHandler.bind(this);
this.contactChangeHandler = this.contactChangeHandler.bind(this);
this.submitApplication = this.submitApplication.bind(this);
this.addressChangeHandler = this.addressChangeHandler.bind(this);
this.genderChangeHandler = this.genderChangeHandler.bind(this);
this.raceChangeHandler = this.raceChangeHandler.bind(this);
this.veteranChangeHandler = this.veteranChangeHandler.bind(this);
this.fileChangeHandler = this.fileChangeHandler.bind(this);
this.disabilityChangeHandler = this.disabilityChangeHandler.bind(this);
this.hearChangeHandler = this.hearChangeHandler.bind(this);
this.coverLetterChangeHandler = this.coverLetterChangeHandler.bind(this);
}
componentWillReceiveProps(nextProps) {
    console.log("nextprop applied", nextProps.applied);
    if(nextProps.applied == true)
    {
        console.log("nextprop applied", nextProps.applied);
        swal("Job Applied successfully!", " ", "success");
    }
    
}
coverLetterChangeHandler = (e) => {
    this.setState({
        cover : e.target.value
    })
}
fnameChangeHandler = (e) => {
    this.setState({
        firstname : e.target.value
    })
}
hearChangeHandler = (e) => {
    this.setState({
        hear : e.target.value
    })
}
lnameChangeHandler = (e) => {
    this.setState({
        lastname : e.target.value
    })
}
emailChangeHandler = (e) => {
    this.setState({
        email : e.target.value
    })
}
contactChangeHandler = (e) => {
    this.setState({
        contact : e.target.value
    })
}
addressChangeHandler = (e) => {
    this.setState({
        address : e.target.value
    })
}
genderChangeHandler = (e) => {
    this.setState({
        gender : e.target.value
    })
}
raceChangeHandler = (e) => {
    this.setState({
        race : e.target.value
    })
}
veteranChangeHandler = (e) => {
    this.setState({
        veteran : e.target.value
    })
}
disabilityChangeHandler = (e) => {
    this.setState({
        disability : e.target.value
    })
}
fileChangeHandler = (e) => {
     this.setState({
         selectedFile: e.target.files[0]
       })
 }
submitApplication = (e) => {
    const { selectedFile } = this.state;
    e.preventDefault();
    const values = {
        email : this.state.email,
        firstname : this.state.firstname,
        lastname : this.state.lastname,
        contact : this.state.contact,
        address : this.state.address,
        gender : this.state.gender,
        race : this.state.race,
        veteran : this.state.veteran,
        disability : this.state.disability,
        hear : this.state.hear,
        resume : selectedFile.name,
        cover_letter : this.state.cover,
        company : "Mozilla",
        jobtitle : "Machine learning Intern(Summer 2019)",
        joblocation : "San Fransisco, California"

    }
    console.log("selected file: " + selectedFile.name);
    let formData = new FormData();
    formData.append('selectedFile', selectedFile);
    axios.post(`${BASE_URL}/uploadresume`, formData)
                     .then((response) => {
                         if(response.status == 200){
                          
                           console.log("Status: " + response.status );
                         }
                
    });
    this.props.customApplyJob(values)
}
    render() { 
        return (
            <div>
            <div className="headerback">
            <div className="applytitle">
                <img className="image1" src="https://media.licdn.com/dms/image/C4E0BAQGHz8JwrMTQ0A/company-logo_200_200/0?e=1550102400&v=beta&t=rYxO6tzuIqWcPYuH6AzMQPsbxiTptwndzJb_q6XTzqo"/>
            </div>
            <div> 
            <h2 className="cent">Machine learning Intern(Summer 2019)</h2>
            <h3 className="cent1">Mozilla</h3><br/>
            <p className="cent2">San Fransisco, California</p></div>
           
            </div>
            <div className="login-form">
                    <h3 className="head">Personal Information</h3>
                    <form enctype="multipart/form-data" onSubmit={this.submitApplication.bind(this)}>
                    
                    <div class="form-group1">
                        <label className="field-label" for="fname">FirstName*</label>
                        <input onChange = {this.fnameChangeHandler} type="text" class="form-control1" name="firstname" id="fname" required/>
                    </div>
                    <div class="form-group1">
                        <label className="field-label" for="lname">LastName*</label>
                        <input onChange = {this.lnameChangeHandler} type="text" class="form-control1" name="lastname" id="lname" required/>
                    </div>
                    <div class="form-group1">
                        <label className="field-label" for="emailid">Email*</label>
                        <input onChange = {this.emailChangeHandler} type="email" class="form-control1" name="email" id="emailid" required/>
                    </div>
                    <div class="form-group1">
                        <label className="field-label" for="contact">Phone*</label>
                        <input onChange = {this.contactChangeHandler} class="form-control1" type="text" name="contact" id="contact" required/>
                    </div>
                    <div class="form-group1">
                        <label className="field-label" for="address">Address*</label>
                        <input onChange = {this.addressChangeHandler} type="text" class="form-control1" name="address" id="address" required/>
                    </div>
                    <div class="form-group1">
                        <label className="field-label" for="resume">Resume/CV*</label>
                        <input type="file" id="resume" name="selectedFile" onChange={this.fileChangeHandler}/>
                    </div>
                    <div class="form-group1">
                        <label className="field-label" for="coverl">Cover Letter(optional)</label>
                        <textarea onChange = {this.coverLetterChangeHandler} type="text" class="form-control1" name="cover" id="coverl"/>
                    </div>
                    <div class="form-group1">
                        <label className="field-label">How did you hear about us</label>
                        <select class="form-control1"  onChange = {this.hearChangeHandler}>
                        <option value="Select">Select</option>
                            <option value="Linkedin">Linkedin</option>
                            <option value="company website">company website</option>
                            <option value="Career Fairs">Career Fairs</option>
                            <option value="Google">Google</option>
                        </select>          
                       
                    </div>
                    <hr/>
                    <h3 className="head">U.S. EQUAL EMPLOYMENT OPPORTUNITY INFORMATION</h3>(Completion is voluntary and will not subject you to adverse treatment)
                    <br/><br/>
                    <p>Our company values diversity. To ensure that we comply with reporting requirements and to learn more about how we can increase diversity in our candidate pool, we invite you to voluntarily provide demographic 
                    information in a confidential survey at the end of this application.</p>

                    <div class="form-group1">
                        <label className="field-label">Gender</label>
                        <select class="form-control1"  onChange = {this.genderChangeHandler}>
                        <option value="Select">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Decline to self-identity">Decline to self-identity</option>
                        </select>          
                      
                    </div>
                    <div class="form-group1">
                        <label className="field-label">Race</label>
                        <select class="form-control1"  onChange = {this.raceChangeHandler}>
                        <option value="Select">Select</option>
                            <option value="Hispanic or Latino">Hispanic or Latino</option>
                            <option value="White (Not Hispanic or Latino)">White (Not Hispanic or Latino)</option>
                            <option value="Black or African American (Not Hispanic or Latino)">Black or African American (Not Hispanic or Latino)</option>
                            <option value="Native Hawaiian or Other Pacific Islander (Not Hispanic or Latino)">Native Hawaiian or Other Pacific Islander (Not Hispanic or Latino)</option>
                            <option value="Asian (Not Hispanic or Latino)">Asian (Not Hispanic or Latino)</option>
                            <option value="American Indian or Alaska Native (Not Hispanic or Latino)">American Indian or Alaska Native (Not Hispanic or Latino)</option>
                            <option value="Two or More Races (Not Hispanic or Latino)">Two or More Races (Not Hispanic or Latino)</option>
                            <option value=">Decline to self-identity">Decline to self-identity</option>
                        </select>          
            
                    </div>
                    <div class="form-group1">
                        <label className="field-label">Veteran Status</label>
                        <select class="form-control1"  onChange = {this.veteranChangeHandler}>
                        <option value="Select">Select</option>
                            <option value="I am a veteran">I am a veteran</option>
                            <option value="I am not a veteran">I am not a veteran</option>
                            <option value="Decline to self-identify">Decline to self-identity</option>
                        </select>          
                    
                    </div>

                    <div class="form-group1">
                        <label className="field-label">Disability Status</label>
                        <select class="form-control1"  onChange = {this.disabilityChangeHandler}>
                        <option value="Select">Select</option>
                            <option value="Yes, I have a disability (or previously had a disability)">Yes, I have a disability (or previously had a disability)</option>
                            <option value="No, I don't have a disability">No, I don't have a disability</option>
                            <option value="I don't wish to answer">I don't wish to answer</option>
                        </select>          
                     
                    </div>
                   
                    <button className="btn btn-primary1" type="submit">Submit Application</button>
                    </form>
                    
                    
            </div>
         </div>
          );
    }
}





const mapStateToProps = state => {
    return {
       
        applied : state.LoginReducer.applied
     };
  };
  
function mapDispatchToProps(dispatch) {
      return bindActionCreators({ customApplyJob }, dispatch);
}



export default connect(mapStateToProps, mapDispatchToProps)(customApply);

