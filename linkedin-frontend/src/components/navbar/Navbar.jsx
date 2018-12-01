import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import LinkedInLogo1 from "./linkedin_logo_1.png";
import ProfileIcon from "./profileicon.png";
import axios from "axios";
import {history} from "../../util/utils";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {userSearch} from './../../api/Api';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      first_name: ""
    };
  }
  handleSearchChange = e => {
    console.log("inside navbar handleSearchChange");
    this.setState({
      first_name: e.target.value
    });
  };

  searchUsers = () => {
    console.log("inside navbar searchUsers");
    this.props.userSearch(this.state);
      };


  render() {
    return (
      <React.Fragment>
        <nav
          id="extended-nav"
          role="banner"
          tabindex="-1"
          style={{ height: 65, background: "#283e4a" }}
        >
          <span>
            <img
              style={{
                height: 35,
                marginLeft: 50,
                marginRight: 20,
                marginBottom: "20px"
              }}
              src={LinkedInLogo1}
              alt="linkedin"
            />
          </span>
          <span>
            <input
              onChange={this.handleSearchChange}
              style={{
                height: 34,
                width: 300,
                marginBottom: "20px"
              }}
              role="combobox"
              autocomplete="off"
              spellcheck="false"
              aria-autocomplete="list"
              aria-owns="nav-search-artdeco-typeahead-results"
              aria-expanded="false"
              placeholder="Search"
              type="text"
            />
            <img
              onClick={this.searchUsers}
              style={{ width: 40 }}
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
                    d="M22,8.45L12.85,2.26a1.5,1.5,0,0,0-1.69,0L2,8.45,3.06,10,4,9.37V19a1,1,0,0,0,1,1h5V15h4v5h5a1,1,0,0,0,1-1V9.37L20.94,10Z"
                    style={{ "fill-opacity": 1 }}
                  />
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
                    d="M16,17.85V20a1,1,0,0,1-1,1H1a1,1,0,0,1-1-1V17.85a4,4,0,0,1,2.55-3.73l2.95-1.2V11.71l-0.73-1.3A6,6,0,0,1,4,7.47V6a4,4,0,0,1,4.39-4A4.12,4.12,0,0,1,12,6.21V7.47a6,6,0,0,1-.77,2.94l-0.73,1.3v1.21l2.95,1.2A4,4,0,0,1,16,17.85Zm4.75-3.65L19,13.53v-1a6,6,0,0,0,1-3.31V9a3,3,0,0,0-6,0V9.18a6,6,0,0,0,.61,2.58A3.61,3.61,0,0,0,16,13a3.62,3.62,0,0,1,2,3.24V21h4a1,1,0,0,0,1-1V17.47A3.5,3.5,0,0,0,20.75,14.2Z"
                    class="active-item"
                    style={{ "fill-opacity": 1 }}
                  />
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
                    d="M2,13H22v6a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V13ZM22,8v4H2V8A1,1,0,0,1,3,7H7V6a3,3,0,0,1,3-3h4a3,3,0,0,1,3,3V7h4A1,1,0,0,1,22,8ZM15,6a1,1,0,0,0-1-1H10A1,1,0,0,0,9,6V7h6V6Z"
                    class="active-item"
                    style={{ "fill-opacity": 1 }}
                  />
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
                    d="M21,9H8a1,1,0,0,0-1,1V20a1,1,0,0,0,1,1H18l4,3V10A1,1,0,0,0,21,9Zm-4,8H12V16h5v1Zm1-3H11V13h7v1ZM17,5V7H6A1,1,0,0,0,5,8v8H3a1,1,0,0,1-1-1V5A1,1,0,0,1,3,4H16A1,1,0,0,1,17,5Z"
                    class="active-item"
                    style={{ "fill-opacity": 1 }}
                  />
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
                    d="M18.94,14H5.06L5.79,8.44A6.26,6.26,0,0,1,12,3h0a6.26,6.26,0,0,1,6.21,5.44Zm2,5-1.71-4H4.78L3.06,19a0.71,0.71,0,0,0-.06.28,0.75,0.75,0,0,0,.75.76H10a2,2,0,1,0,4,0h6.27A0.74,0.74,0,0,0,20.94,19Z"
                    class="active-item"
                    style={{ "fill-opacity": 1 }}
                  />
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
        </nav>
      </React.Fragment>
    );
  }
}

function matchDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return bindActionCreators({userSearch: userSearch}, dispatch);
}

export default connect(null,matchDispatchToProps)(Navbar);