import React,{ Component } from 'react';
import { Route, Redirect,withRouter } from 'react-router-dom';
import './login.css';
import LoginHeader from './topheader';
import { Button,Modal,Checkbox } from 'react-bootstrap';
// import * as UTIL from './../../utils/util';
// import * as VALIDATION from './../../utils/validation';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {userDelete} from './../../api/Api';
// import * as VALIDATION from './../util/validation';
import Navbar from './../navbar/Navbar.jsx';
import {history} from "../../util/utils";


class DeleteAccount extends Component {
	constructor(props) {
		super(props);
		this.delete={
			reason:'',
			feedback:''
		};
	}
	clickDelete=(e)=>{
		e.preventDefault();
		this.delete=this.props.currentUserDetails;
		this.delete.applicant_id=this.props.currentUserDetails.applicant_id;
		this.delete.status = 'Inactive';
		this.props.userDelete(this.delete);
	}
	render() {
		if(!localStorage.getItem('servertoken'))
		{
			history.push('/')
		}
		return(
			<div>
						<Navbar />
						<div className="delete-container">
						<h1> {this.props.currentUserDetails.first_name} , we’re sorry to see you go </h1>
						<br></br> <br></br>
						<h5>Tell us why you’re closing your account:</h5>
						<br></br> <br></br>
						<div className="radio">
              	<label>
                	<input className="radiodelete" name="delete" type="radio" value="I have a duplicate account"  onChange={(event) => { this.delete.reason = event.target.value}}/>
                      I have a duplicate account
                </label>
                <br></br> <br></br>
                <label>
                  <input className="radiodelete" name="delete" type="radio" value="I’m getting too many emails" onChange={(event) => { this.delete.reason = event.target.value}}/>
                      I’m getting too many emails
                </label>
								<br></br> <br></br>
								<label>
                  <input className="radiodelete" name="delete" type="radio" value="I’m not getting any value from my membership" onChange={(event) => { this.delete.reason = event.target.value}}/>
                      I’m not getting any value from my membership
                </label>
								<br></br> <br></br>
								<label>
                  <input className="radiodelete" name="delete" type="radio" value="I have a privacy concern" onChange={(event) => { this.delete.reason = event.target.value}}/>
                      I have a privacy concern
                </label>
								<br></br> <br></br>
								<label>
                  <input className="radiodelete" name="delete" type="radio" value="I’m receiving unwanted contact" onChange={(event) => { this.delete.reason = event.target.value}}/>
                    	I’m receiving unwanted contact
                </label>
								<br></br> <br></br>
								<label>
                  <input className="radiodelete" name="delete" type="radio" value="Other" onChange={(event) => { this.delete.reason = event.target.value}}/>
                    	Other
                </label>
								<br></br> <br></br>
            </div>
						<label className="label-class">Your feedback matters. Is there anything else you’d like us to know?</label><br></br><br></br>
						<textarea className="about-class"rows="4" cols="50"
						onChange={(event) => { this.delete.feedback = event.target.value}}/>
						<br></br> <br></br>
						  <button onClick ={() => {history.push('/')}} className="btn btn-primary homesuccess">Back to Home Page</button>
	          <button type="button" className="btn btn-primary deletesuccess" onClick={this.clickDelete}>Delete</button>
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
    return bindActionCreators({userDelete: userDelete}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(DeleteAccount);
