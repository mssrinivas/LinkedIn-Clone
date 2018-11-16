import React, { Component } from 'react';
import './apply.css';
class customApply extends Component {
    state = {  }
    render() { 
        return (
            <div>
            <div className="headerback">
            <h2 className="cent">Machine learning Intern(Summer 2019)</h2>
            <h3 className="cent" >Splunk</h3>&nbsp;<p className="cent">San Fransisco, California</p>
            </div>
            <div className="login-form">
                    <h3 className="head">Personal Information</h3>
                    <form onSubmit={this.submitDetails}>
                    
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
                        <textarea onChange = {this.contactChangeHandler} class="form-control1" name="contact" id="contact" required/>
                    </div>
                    <div class="form-group1">
                        <label className="field-label" for="address">Address*</label>
                        <input onChange = {this.addressChangeHandler} type="text" class="form-control1" name="address" id="address" required/>
                    </div>
                    <div class="form-group1">
                        <label className="field-label" for="address">Upload Resume*</label>
                        {/* <input onChange = {this.addressChangeHandler} type="text" class="form-control1" name="address" id="address" required/> */}
                    </div>
                    <button className="btn btn-primary1" type="submit">Next-></button>
                    </form>
                    
                    {/* <h1 className="success">{this.state.msg}</h1> */}
            </div>
         </div>
          );
    }
}
 
export default customApply;