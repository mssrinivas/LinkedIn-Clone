import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import './Navigation.css'

//create the Navbar Component
class Navigation extends Component {
    constructor(props){
        super(props);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        localStorage.clear()
    }
    render(){
        return(
          <div >          
    <nav class="navbar navbar-expand-lg navbar-light bg-transparent">
        <Link to="/feed" class="navbar-brand"><img alt="linkedIn logo" class="site-header-birdhouse__image " role="presentation" src="https://img.icons8.com/color/200/5e6d77/linkedin.png" height="50" width="50"/></Link> 
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div id="navbarNavDropdown" class="navbar-collapse collapse">
            <div class="paddbetween">
            </div>
            <ul class="navbar-nav">
                <li class="nav-item padtopnavbar">
                <Link to="/feed" class="btn bgwhite " role="button">HOME</Link> 
                &nbsp; &nbsp; &nbsp; 
                </li>
                <li class="nav-item padtopnavbar spacebetween">
                <a class="btn bgwhite " href="/home" role="button"></a> 
                <Link to="/recruiter/myjobs" class="btn bgwhite" role="button">MY JOBS</Link> 
                &nbsp; &nbsp; &nbsp;       
                </li>
                <li class="nav-item padtopnavbar spacebetween">
                <Link to="/recruiter/dashboard" class="btn bgwhite " role="button">DASHBOARD</Link> 
                &nbsp; &nbsp; &nbsp; 
               
                </li>
            </ul>
        </div>
    </nav>
</div>
        )
    }
}

export default Navigation;