import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import UserListCard from './userlistcard.js';
import axios from 'axios';
import Navbar from './../navbar/Navbar.jsx';
import './applicantprofile.css';
import {BASE_URL} from './../constants/constants.js';
import {history} from "../../util/utils";
class UserListing extends Component {
    constructor(props){
        super(props)
        this.state = {
            userlistings :[],
            error:''
        };
    }

    componentWillMount(){
        console.log("Length of store variable: ", this.props.userSearch.length);
        if(this.props.userSearch.length == 0 && this.props.searchCriteria=='People')  {
            const url = BASE_URL+"/search/users";
            axios.get(url).then((response)=>{
                console.log("Got the response");
                this.setState({
                  userlistings : response.data
                });
            }).catch((error)=>{
                this.setState({error : "Connection timed out"});
            })
        }
        else {
          this.setState({
            userlistings : this.props.userSearch
          })
        }

    }
    render() {
      if(!localStorage.getItem('servertoken'))
      {
        history.push('/')
      }
        console.log("Value of store variable: ", this.props.userSearch);
        if(this.props.userSearch.length != 0) {
            this.state.userlistings= this.props.userSearch;
        }
        return (
            <div>
                <Navbar />
                <div className="tile-container">
                 {
                  this.state.userlistings.map((post,index) => {
                         return(<UserListCard data={post}/> );
                        })
                 }
              </div>
            </div>
         );
    }
}

const mapStateToProps = (state) =>{
    return {
        user : state.LoginReducer.currentUserDetails,
        userSearch : state.LoginReducer.userSearch,
        searchCriteria : state.LoginReducer.searchCriteria
    }
}
//
// const mapDispatchToProps = (dispatch) =>{
//     return{
//         jobPost: (jobpost)=>{
//             dispatch({
//                 type:SELECTED_CUSTOM_JOB_POST,
//                 payload : jobpost
//             });
//         }
//     }
// }
//export default JobListing;
export default connect(mapStateToProps,null)(UserListing);
