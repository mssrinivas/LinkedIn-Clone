import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import LinkedInLogo1 from "./linkedin_logo_1.png";
import ProfileIcon from "./profileicon.ico";
import PostJobIcon from "./postjobicon.ico"
import axios from "axios";
import {history} from "../../util/utils";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {userSearch} from './../../api/Api';
import {jobSearch} from './../../api/Api';
import {searchCriteriaFilter} from './../../api/Api';
import {searchFieldAction} from './../../actions/index';
import {recuriterDashBoardSearch} from './../../api/Api';

class Navbar extends Component {
  constructor() {
    super();
    this.userDetails={};
    this.state = {
      CompanyName: "",
      search_filter:"",
      JobLocation:null,
      postingDate:null,
      seniorityLevel:null
    };
  }
  clickSearch =(e) => {
    e.preventDefault();
    this.userDetails.RecruiterEmail = this.props.currentUserDetails.email;
    this.props.recuriterDashBoardSearch(this.userDetails);
  }
  handleSearchChange = e => {
    if(e.target!=undefined) {
      this.state.search_filter=e.target.value;
    }
    else {
      this.state.search_filter=e;
    }
    console.log("Search Criteria entered : ", this.state.first_name);

    if(this.state.search_filter.toLowerCase()=='jobs') {
      this.props.searchCriteriaFilter(this.state.search_filter);
      history.push('/listings');
    }
    if(this.state.search_filter.toLowerCase()=='people') {
      this.props.searchCriteriaFilter(this.state.search_filter);
      history.push('/userlisting');
    }
  };
  searchUsers = e => {
    console.log("Search criteria selected is: ", this.props.searchCriteria);
    console.log("Search value entered is: ", this.state.first_name);
    if(this.state.first_name=='People') {
      this.handleSearchChange('People');
    }
    if(this.state.first_name=='Jobs') {
      this.handleSearchChange('Jobs');
    }
    if(this.props.searchCriteria!='Jobs' && this.props.searchCriteria!='People' && this.state.first_name!='People' && this.state.first_name!='Jobs') {
      alert("Please enter the criteria");
    }
    if(this.props.searchCriteria=='People') {
        this.state.first_name = this.state.search_filter;
        this.props.userSearch(this.state);
    }
    if(this.props.searchCriteria=='Jobs') {
        console.log("Final search field value : ", this.state.search_filter);
        this.state.CompanyName = this.state.search_filter;
        this.props.jobSearch(this.state);
    }

  };
  render() {
    let inputText=(this.props.searchCriteria!='')?<input style={{ marginLeft : 50}} type="text" list="searchtype" onSelect={this.handleSearchChange} />:<input style={{ marginLeft : 50}} type="text" list="searchtype" onChange={(event) => { this.state.first_name = event.target.value ,  this.state.CompanyName = event.target.value}} />
    return (
      <React.Fragment>
        <nav
          id="extended-nav"
          role="banner"
          tabindex="-1"
          style={{ height: 65, background: "#283e4a" }}
        >
        <Link to="/feed">
          <span>
            <img
              style={{
                height: 30,
                marginLeft: 50,
                marginBottom: "10px"

              }}

              src={LinkedInLogo1}
              alt="linkedin"
            />
          </span>
        </Link>
          <span>
              {inputText}
              <datalist id="searchtype" className="select-box" >
                <option>Jobs</option>
                <option>People</option>
              </datalist>
            <img
              onClick={this.searchUsers}
              style={{ width: 40}}
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAATrSURBVGhD7Vjtb1NVHB5fNDF+MvLBxBgTNca/QL8QVEyQxEhgDj+Y9eWctkpLB2OBwWBoImDEzSnDlyFmjYnLZBN1g72ikjCZRoJMDQQRiTEgaoyQKGuL2c/nd3vu7Wl7Nrf23r0kfZIn7bLb3/M89563360oo4wyvEM8Hr/Z7/c/HAwGd4Cd4Ah4UvEouB+MSSkfUD+ZX/D5fPfAYGsgEPgTnzRNfgvWRCKRW1SZuQPu7G0w8zb4rzI3YyL876BAuUWZqrMMIcQjMHCpwJyQJDa/ROLlThKv95FsGyH51jGSLT0kdraTiG/OvV4RtQbxuViVnx1A1A/eyDETrSW5d5BCH/1BoSPXp6TsuEBiV4KCMpwTBryIuvcpGW+BJ/EMBCcccRki2XyIZM9Vo+kp+cHPJBqac8IgyC8855ScN4DQUjA7H55dRzIxZjY5XR7+h8SegxiSQg90NhqN3qpk3QVPbNyty47Yc3GSnReN5sJg/WfjtPuLJL32VYqav0zSi8eTVDM4bryeKfYO6EGYCSXtLlCYV6eMCMZ2KHG6wAwHeGU0SR+fS9PwTzcKOAR2fJ+mrZ+bA8nd7+lBJnhBUfLuAE/jXn1yi6ZDBSbWD1+n7rPZAH3n05QYS9GbJ1PU9k3aCjB0IRuo7VTKCp5T5/DfJGp36GFGlQV3gBD7nOK8OuVN7A0I0aOeQu8Pado5kqRIn2ZQcR2GFgfjIHwtBw3nXSfbT+lBePIvUTZKQ1VV1U0o5uzY1hKrCTPf+DplGTt4Jk2xgcnngc3tx8ap/8dMmLqjhdfzPqSFeUdZKQ3q7JQpis3OtE/Eh8atubG2//9D2NyExaAJi0DB8AJF67Ae5FfYKH3XRyE+AFpF+U7li3rCD69AL7scY9Lfr+wUDwyrDqcgjh1GYQ+Yd5RZpewUDwQ57gTB2ckk6gWDm3Y5QTC848pO8UChMbug3H/CKOoFRWOrEwTcouwUDxThpigTBKdYk6gXFNtanCAYFfXKTvFAoU+dIDiKm0S9YHDj804QDK2wslM8cDfa7ILcT5hEXScfJNfW6EGWKTvFA4ViThCsJEZhlynfP+eEALllKL3h4hcFWlGrKTKJu0mxp0sPMqaslA4Mr+/swtzZmcRdY881Csbq9CDblI3SgWI1TmEc4SU6O6MJFyhbevUQqerq6ruUjdLBr2xQ9DdbgNtTnpAmIyWx+zK6zpgTBCPhgLLgHlBU2AJWGLSnRjPFEq1BsLbRqQ9eC4fDdyh5V7EIxQccIfTYsnXIbGqm/OQvCm5t0kPw0+B3Xd4AAoshcF4X5PaUOzujwemw61L+k7AIndJ386mg2t7sSwgmjHBnZzQ6GbE6WRM7Es0JoNPzMNhp74bImQJx9Cty37DVTxjNg7zZ8T4hcpfYSenzBRqUrDfg904I0w6x7Ms6h2iKcAoQOIrzKVY0vEqi7oWcY4dO1LmK5inAx3X87dTz+QO09IlKerzy6W4l6x34lQ1ER23xGTIFvquvTnYYO8SDy1danJUwDNzVJeAB8Ipm1MQJXHMan42hUOhO9fMcVAcCG/UQsx7GBvfYMLqK7y5M1zPxPQwuw+Z6u7psSjz6ZGV/fpA5CeMGymHmK8ph5ismC7Ni9ZoudcnCQX6Yh8Dlq9dsV/9eWLDDLOgQNh5b+VTvgg9RRhlzhoqK/wD8WDrVjI1PyAAAAABJRU5ErkJggg=="
            />
          </span>
          <Link to="/feed">
            <div
              style={{
                display: "inline-block",
                paddingTop: "10px",
                marginLeft: 250,
                textAlign: "center"
              }}
              className="nav-home"
            >
              <span style={{ display: "inline-block" }}>
                <svg
                  viewBox="0 0 24 24"
                  style={{ color: "white", width: "24px", height: "24px" }}
                  x="0"
                  y="0"
                  preserveAspectRatio="xMinYMin meet"
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22,9.45L12.85,3.26a1.5,1.5,0,0,0-1.69,0L2,9.45,3.06,11,4,10.37V20a1,1,0,0,0,1,1h6V16h2v5h6a1,1,0,0,0,1-1V10.37L20.94,11ZM18,19H15V15a1,1,0,0,0-1-1H10a1,1,0,0,0-1,1v4H6V8.89l6-4,6,4V19Z"
                    style={{ fill: "#e1e9ee" }}
                  />
                </svg>
              </span>
              <span>
                <div
                  style={{
                    display: "block",
                    "font-size": "0.85rem",
                    "font-weight": 400,
                    color: "#c7d1d8"
                  }}
                >
                  Home
                </div>
              </span>
            </div>
          </Link>
          <Link to="/mynetworks">
            <div
              style={{
                display: "inline-block",
                marginLeft: 20,
                textAlign: "center"
              }}
              className="nav-home"
            >
              <span
                id="mynetwork-tab-icon"
                class="nav-item__icon"
                lang="en"
                aria-role="presentation"
              >
                <svg
                  viewBox="0 0 24 24"
                  style={{ width: "24px", height: "24px" }}
                  x="0"
                  y="0"
                  preserveAspectRatio="xMinYMin meet"
                  class="nav-icon"
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.74,14.2L19,13.54V12.86l0.25-.41A5,5,0,0,0,20,9.82V9a3,3,0,0,0-6,0V9.82a5,5,0,0,0,.75,2.63L15,12.86v0.68l-1,.37a4,4,0,0,0-.58-0.28l-2.45-1V10.83A8,8,0,0,0,12,7V6A4,4,0,0,0,4,6V7a8,8,0,0,0,1,3.86v1.84l-2.45,1A4,4,0,0,0,0,17.35V20a1,1,0,0,0,1,1H22a1,1,0,0,0,1-1V17.47A3.5,3.5,0,0,0,20.74,14.2ZM16,8.75a1,1,0,0,1,2,0v1.44a3,3,0,0,1-.38,1.46l-0.33.6a0.25,0.25,0,0,1-.22.13H16.93a0.25,0.25,0,0,1-.22-0.13l-0.33-.6A3,3,0,0,1,16,10.19V8.75ZM6,5.85a2,2,0,0,1,4,0V7.28a6,6,0,0,1-.71,2.83L9,10.72a1,1,0,0,1-.88.53H7.92A1,1,0,0,1,7,10.72l-0.33-.61A6,6,0,0,1,6,7.28V5.85ZM14,19H2V17.25a2,2,0,0,1,1.26-1.86L7,13.92v-1a3,3,0,0,0,1,.18H8a3,3,0,0,0,1-.18v1l3.72,1.42A2,2,0,0,1,14,17.21V19Zm7,0H16V17.35a4,4,0,0,0-.55-2l1.05-.4V14.07a2,2,0,0,0,.4.05h0.2a2,2,0,0,0,.4-0.05v0.88l2.53,1a1.5,1.5,0,0,1,1,1.4V19Z"
                    class="inactive-item"
                    style={{ fill: "#e1e9ee" }}
                  />
                </svg>
              </span>
              <span>
                <div
                  style={{
                    display: "block",
                    "font-size": "0.85rem",
                    "font-weight": 400,
                    color: "#c7d1d8"
                  }}
                >
                  My Network
                </div>
              </span>
            </div>
          </Link>
          <Link to="/jobs">
            <div
              style={{
                display: "inline-block",
                marginLeft: 20,
                textAlign: "center"
              }}
              className="nav-home"
            >
              <span
                id="jobs-tab-icon"
                class="nav-item__icon"
                lang="en"
                aria-role="presentation"
              >
                <svg
                  viewBox="0 0 24 24"
                  style={{ width: "24px", height: "24px" }}
                  x="0"
                  y="0"
                  preserveAspectRatio="xMinYMin meet"
                  class="nav-icon"
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21,7H17V6a3,3,0,0,0-3-3H10A3,3,0,0,0,7,6V7H3A1,1,0,0,0,2,8V19a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V8A1,1,0,0,0,21,7ZM9,6a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1V7H9V6ZM20,18H4V13H20v5Zm0-6H4V9H20v3Z"
                    class="inactive-item"
                    style={{ fill: "#e1e9ee" }}
                  />
                </svg>
              </span>
              <span>
                <div
                  style={{
                    display: "block",
                    "font-size": "0.85rem",
                    "font-weight": 400,
                    color: "#c7d1d8"
                  }}
                >
                  Jobs
                </div>
              </span>
            </div>
          </Link>
          <Link to="/messages">
            <div
              style={{
                display: "inline-block",
                marginLeft: 20,
                textAlign: "center"
              }}
              className="nav-home"
            >
              <span
                id="messaging-tab-icon"
                class="nav-item__icon"
                lang="en"
                aria-role="presentation"
              >
                <svg
                  viewBox="0 0 24 24"
                  style={{ width: "24px", height: "24px" }}
                  x="0"
                  y="0"
                  preserveAspectRatio="xMinYMin meet"
                  class="nav-icon"
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21,8H8A1,1,0,0,0,7,9V19a1,1,0,0,0,1,1H18l4,3V9A1,1,0,0,0,21,8ZM20,19.11L18.52,18H9V10H20v9.11ZM12,15h5v1H12V15ZM4,13H5v2H3a1,1,0,0,1-1-1V4A1,1,0,0,1,3,3H16a1,1,0,0,1,1,1V6H15V5H4v8Zm14,0H11V12h7v1Z"
                    class="inactive-item"
                    style={{ fill: "#e1e9ee" }}
                  />
                </svg>
              </span>
              <span>
                <div
                  style={{
                    display: "block",
                    "font-size": "0.85rem",
                    "font-weight": 400,
                    color: "#c7d1d8"
                  }}
                >
                  Messaging
                </div>
              </span>
            </div>
          </Link>
          <Link to="">
            <div
              style={{
                display: "inline-block",
                marginLeft: 20,
                textAlign: "center"
              }}
              className="nav-home"
            >
              <span
                id="notifications-tab-icon"
                class="nav-item__icon"
                lang="en"
                aria-role="presentation"
              >
                <svg
                  viewBox="0 0 24 24"
                  style={{ width: "24px", height: "24px" }}
                  x="0"
                  y="0"
                  preserveAspectRatio="xMinYMin meet"
                  class="nav-icon"
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.94,19L19,14.49s-0.41-3.06-.8-6.06A6.26,6.26,0,0,0,12,3h0A6.26,6.26,0,0,0,5.79,8.44L5,14.49,3.06,19a0.71,0.71,0,0,0-.06.28,0.75,0.75,0,0,0,.75.76H10a2,2,0,1,0,4,0h6.27A0.74,0.74,0,0,0,20.94,19ZM12,4.75h0a4.39,4.39,0,0,1,4.35,3.81c0.28,2.1.56,4.35,0.7,5.44H7L7.65,8.56A4.39,4.39,0,0,1,12,4.75ZM5.52,18l1.3-3H17.18l1.3,3h-13Z"
                    class="inactive-item"
                    style={{ fill: "#e1e9ee" }}
                  />
                </svg>
              </span>
              <span>
                <div
                  style={{
                    display: "block",
                    "font-size": "0.85rem",
                    "font-weight": 400,
                    color: "#c7d1d8"
                  }}
                >
                  Notifications
                </div>
              </span>
            </div>
          </Link>
          <span>
            <span className="dropdown">
              <button
                id="login-btn"
                className=" dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{ border: "none", background: "transparent" }}
              >
                <div
                  style={{
                    display: "inline-block",
                    marginLeft: 20,
                    textAlign: "center"
                  }}
                  className="nav-home"
                >
                  <span
                    id="notifications-tab-icon"
                    class="nav-item__icon"
                    lang="en"
                    aria-role="presentation"
                  >
                    <img style={{ width: 25 }} src={ProfileIcon} />
                  </span>
                  <span>
                    <div
                      style={{
                        display: "block",
                        "font-size": "0.85rem",
                        "font-weight": 400,
                        color: "#c7d1d8"
                      }}
                    >
                      Profile
                    </div>
                  </span>
                </div>
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <Link
                  to={{ pathname: "/userprofile", state: "" }}
                  className="dropdown-item"
                >
                  Profile Page
                </Link>
                <Link
                  to={{ pathname: "/deleteapplicantaccount", state: "" }}
                  className="dropdown-item"
                >
                  Delete Account
                </Link>

                <Link
                  to={{ pathname: "/", state: "" }}
                  className="dropdown-item"
                >
                  Logout
                </Link>
              </div>
            </span>
          </span>
          <Link to="/postjob">
            <div
              style={{
                display: "inline-block",
                marginLeft: 20,
                textAlign: "center"
              }}
              className="nav-home"
            >
              <span
                id="notifications-tab-icon"
                class="nav-item__icon"
                lang="en"
                aria-role="presentation"
              >
                <img src={PostJobIcon} style={{ width: 20 }} />
              </span>

              <span>
                <div
                  style={{
                    display: "block",
                    "font-size": "0.85rem",
                    "font-weight": 400,
                    color: "#c7d1d8"
                  }}
                >
                  Post Job
                </div>
              </span>
            </div>
          </Link>
          {this.props.currentUserDetails.recruiter_flag != 0 ?
          <Link to="/recruiterdashboard">
            <div onClick={this.clickSearch}
              style={{
                display: "inline-block",
                marginLeft: 20,
                textAlign: "center"
              }}
              className="nav-home"
            >
              <span
                id="notifications-tab-icon"
                class="nav-item__icon"
                lang="en"
                aria-role="presentation"
              >
                <img src="http://cgitwebapps.coralgables.com/Images/DataServices/ic_dashboard_grey600_48dp.png" style={{ width: 20 }} />
              </span>
              <span>
                <div
                  style={{
                    display: "block",
                    "font-size": "0.85rem",
                    "font-weight": 400,
                    color: "#c7d1d8"
                  }}
                >
                  Recruiter Dashboard
                </div>
              </span>
            </div>
          </Link>
          :''}
        </nav>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) =>{
    return {
        currentUserDetails : state.LoginReducer.currentUserDetails,
        searchCriteria : state.LoginReducer.searchCriteria
    }
}
function matchDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return bindActionCreators({userSearch: userSearch,jobSearch:jobSearch, searchCriteriaFilter: searchCriteriaFilter, recuriterDashBoardSearch: recuriterDashBoardSearch}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(Navbar);
