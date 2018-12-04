import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import './RecruiterJobsDashboardCard.css';
import axios from 'axios';
import Navbar from './../navbar/Navbar.jsx';
import {BASE_URL} from './../constants/constants.js';
import RecruiterJobsDashboardCard from './RecruiterJobsDashboardCard';
import {history} from "../../util/utils";
class RecruiterJobsDashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            jobListings :[],
            error:''
        };
    }

    componentDidMount(){
            const url = `${BASE_URL}/getjobs/myjobs`;
            axios.get(url,{
                params: {
                  mail: this.props.user.email
                }}).then((response)=>{
                console.log("Got the response");
                this.setState({
                  jobListings : response.data.joblistings
                });
                console.log("After response",response.data);
            }).catch((error)=>{
                this.setState({error : "Connection timed out"});
            })
    }
    render() {
      if(!localStorage.getItem('servertoken'))
      {
        history.push('/')
      }
        var SHOWVALUES = null;
        console.log("VALUE",this.state.jobListings.length);
        if(this.state.jobListings.length != 0)
        {
            SHOWVALUES = (this.state.jobListings.map(function (item, index) {
                console.log("ITEM IS", item)
                return (
                    <RecruiterJobsDashboardCard item={item}/>
                )
            }));
        }
        return (
            <div>
                <Navbar />
                <div className="tile-container">
                 {
                  SHOWVALUES
                 }
              </div>
            </div>
         );
    }
}

const mapStateToProps = (state) =>{
    return {
        user : state.LoginReducer.currentUserDetails,
    }
}

export default connect(mapStateToProps,null)(RecruiterJobsDashboard);
