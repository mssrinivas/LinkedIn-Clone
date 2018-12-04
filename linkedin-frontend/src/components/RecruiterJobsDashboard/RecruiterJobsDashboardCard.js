import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import './RecruiterJobsDashboardCard.css';
import {Link} from 'react-router-dom';

class RecruiterJobsDashboardCard extends Component {
  constructor(props) {
    super(props);
  }

    render() {
        var image_path=this.props.item.CompanyLogo;
        const fields = this.props.item.resume.split("/");
        var filename=fields.pop();
        var url = "/resumes/"+this.props.item.Applicant_id+"/"+filename;
        return (
            <div className="table2">
             <img className="user-image"src={image_path}/>
              <br></br>
            <h5 className="details1">{"Company : " +this.props.item.CompanyName}&nbsp;&nbsp;&nbsp;{"Job Title: " +this.props.item.JobTitle}&nbsp;&nbsp;&nbsp;{"Job Location: " +this.props.JobLocation}&nbsp;&nbsp;&nbsp;</h5>
            <h5 className="details1">{"Application Status: " +this.props.item.Applied}</h5>
            {/* <button type="button" className="btn btn-primary message-button" onClick={()=>{this.VIEWRESUME(this.props.item.Applicant_id, this.props.item.resume)}}>VIEW RESUME</button> */}
            <Link className="btn btn-primary message-button" to={url}>VIEW RESUME</Link>
            <h5 className="details1">{"Applicant ID: " +this.props.item.Applicant_id} &nbsp;&nbsp;&nbsp;</h5>
            <h5 className="details1">{"Address: " +this.props.item.Address}</h5>
            <h5 className="details1">{"Email ID: " +this.props.item.Email}</h5>
            <h5 className="details1">{"Phone: " +this.props.item.Phone}</h5>
    </div>
         );
    }
}


export default RecruiterJobsDashboardCard;