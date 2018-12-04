import React,{ Component } from 'react';
import Nav from 'react-bootstrap/lib/Nav'
import './profile.css';
import {userLogin} from './../../api/Api';
import { connect } from 'react-redux';
import { Button} from 'react-bootstrap';
import {history} from "../../util/utils";
import { Glyphicon } from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import { Route, Redirect,withRouter } from 'react-router-dom';
import  { NavbarBrand, Navbar, NavbarNav, NavItem, Dropdown,DropdownMenu,DropdownItem,DropdownToggle,NavbarToggler,Collapse } from 'mdbreact';

class LoginHeader extends Component {
  constructor(props) {
		super(props);
		this.userDetails = {
			email: "",
			password: ""
		};
	}
    render() {
        return (
                <div className="linkedin-profile">
                  <Navbar expand="md" scrolling className="linkedin-nav">
                    <NavbarBrand href="#">
                      <img className="linkedin-logo" src ="https://static.licdn.com/sc/h/95o6rrc5ws6mlw6wqzy0xgj7y"/>
                    </NavbarBrand>
                    <NavbarNav right className="nav-bar">
                      <NavItem className="nav-item">
                      <input type="email"  placeholder="Email" className="email-fld"
                      onChange={(userinput) => {
                          this.userDetails.email=userinput.target.value}}/>
                      <input type="password"  placeholder="Password" className="pwd-fld"
                          onChange={(userinput) => {
                          this.userDetails.password=userinput.target.value}}/>

                      </NavItem>
                      <NavItem>
                        <Button type="button" className="btn-primary loginbutton" onClick={() =>this.props.userLogin(this.userDetails)}>Sign In</Button>
                        <a href="#" className="forgot-pwd"> Forgot password? </a>
                      </NavItem>
                      </NavbarNav>

                  </Navbar>
                </div>

        );
    }
}
  function matchDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return bindActionCreators({userLogin: userLogin}, dispatch);
}
export default connect(null,matchDispatchToProps)(LoginHeader);
