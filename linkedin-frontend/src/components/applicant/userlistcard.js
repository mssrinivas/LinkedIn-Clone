import React, { Component } from 'react';
import { Redirect } from 'react-router';
import './applicantprofile.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {onUserClicked} from './../../api/Api';
import axios from 'axios';
import {BASE_URL} from './../constants/constants.js';

class UserListCard extends Component {
  constructor(props) {
    super(props);
    this.userDetails={};
    this.clickUser = this.clickUser.bind(this);
    this.submitMessages = this.submitMessages.bind(this)
  }
    clickUser = (e)=>{
        console.log("Data passed is: ", e);
        this.userDetails.applicant_id = e;
        this.props.onUserClicked(this.userDetails);
    }
    submitMessages = (ID, first_name, last_name, e) => {
    e.preventDefault();
    // if (this.props.currentUser.recruiter_flag == 0){ //current user is applicant
    //   var values = {
    //     Applicant_id : this.props.currentUser._id,
    //     First_name : first_name,
    //     Last_name : last_name,
    //     Recruiter_id : ID,
    //     Message : ""
    // }
    // }else{
    //   var values = {
    //     Recruiter_id : this.props.currentUser._id,
    //     First_name : first_name,
    //     Last_name : last_name,
    //     Applicant_id : ID,
    //     Message : ""
    //   }
    // }
    // // const values = {
    //   From_id : this.props.currentUser._id,
    //   To_id : ID,
    //   First_name : first_name,
    //   Last_name : last_name,
    //   Message : ""
    // }
    const values = {
        From_id : this.props.currentUser._id,
        To_id : ID,
        From_First_name : this.props.currentUser.first_name,
        From_Last_name :this.props.currentUser.last_name,
        To_First_name : first_name,
        To_Last_name : last_name,
        Message : ""
      }
    alert("Please Go to Messaging tab")
    axios.post(`${BASE_URL}/messages/startnew`, values)
                 .then((response ) => {
                     console.log("start new conversation status " ,response.status );
                     console.log("response", response.data);
                     //console.log("response data : " + JSON.stringify(response.data));
                     if(response.status === 200 && response.data == "Started Conversation"){
                            console.log("inside")
                            console.log("response", response.data);

                         this.setState({
                          redirectVar : <Redirect to= "/messages"/>
                         })

                     }
    });

}

    render() {
        const {data} = this.props;
        console.log("Value passed: ", data.first_name);
        var image_path="";
        if(data.profile_img!=null && data.profile_img!=undefined) {
            image_path =`${BASE_URL}/uploads/`+data.applicant_id+".jpeg"
        }
        else {
            image_path ="http://www.socialbiblio.com/sites/default/files/expertos/persona2.png"
        }

        return (
          <div className="table2">
              <img className="user-image"src={image_path}/>
              <br></br>
              <br></br>
              <a href="#" onClick={() => this.clickUser(data.applicant_id)}><h4 className="details1"> {data.first_name} {data.last_name}</h4></a>

              <button type="button" onClick = {this.submitMessages.bind(this, data._id, data.first_name, data.last_name)} className="btn btn-primary message-button" >Message</button>
              <br></br>
              <h5 className="details1">{data.student_flag!=0? "Pursuing  " +data.education+ " at  " +data.school: "Works at  " +data.company+ "  as " +data.job_title}</h5>
              <br></br>
              <h5 className="details1">{data.city!=null?data.city:"San Jose"}</h5>
              <br></br>
          </div>
         );
    }
}

function mapStateToProps(state) {
    return {
        userSearch: state.LoginReducer.userSearch,
        currentUser : state.LoginReducer.currentUserDetails
    };

}

function matchDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return bindActionCreators({onUserClicked: onUserClicked}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(UserListCard);
