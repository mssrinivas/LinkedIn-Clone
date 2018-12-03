import React, { Component } from 'react';
import './applicantprofile.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {onUserClicked} from './../../api/Api';

class UserListCard extends Component {
  constructor(props) {
    super(props);
    this.userDetails={};
    this.clickUser = this.clickUser.bind(this);
  }
    clickUser = (e)=>{
        console.log("Data passed is: ", e);
        this.userDetails.applicant_id = e;
        this.props.onUserClicked(this.userDetails);
    }

    render() {
        const {data} = this.props;
        console.log("Value passed: ", data.first_name);
        var image_path="";
        if(data.profile_img!=null && data.profile_img!=undefined) {
            image_path ="http://localhost:3001/uploads/"+data.applicant_id+".jpeg"
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
              <button type="button" className="btn btn-primary message-button">Message</button>
              <br></br>
              <h5 className="details1">{data.student_flag!=0? "Pursuing  " +data.education+ " at  " +data.school: "Works at  " +data.company+ "  as " +data.job_title}</h5>
              <br></br>
              <h5 className="details1">{data.city!=null?data.city:"San Jose"}</h5>
              <br></br>
          </div>
         );
    }
}


function matchDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return bindActionCreators({onUserClicked: onUserClicked}, dispatch);
}

export default connect(null,matchDispatchToProps)(UserListCard);
