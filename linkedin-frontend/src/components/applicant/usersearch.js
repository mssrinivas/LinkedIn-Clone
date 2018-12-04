import React, { Component } from 'react';
// import JobListCard from './joblistcard.js';
import {connect} from 'react-redux';
import './applicantprofile.css';
import {bindActionCreators} from 'redux';
import Navbar from './../navbar/Navbar.jsx';
import {BASE_URL} from './../constants/constants.js';
import {history} from "../../util/utils";
class UserSearch extends Component {
    render() {
      if(!localStorage.getItem('servertoken'))
      {
        history.push('/')
      }
      let name = this.props.userSearch
        return (
            <div>
                <Navbar />
                <div className="user-search">
                        {
                          this.props.userSearch.map((user) => {
                             return(<div><h1>{user.first_name}</h1> <br></br></div>);
                            })
                        }
                </div>
            </div>
         );
    }
}
function mapStateToProps(state) {
    return {
        userSearch: state.LoginReducer.userSearch,
    };

}
export default connect(mapStateToProps,null)(UserSearch);
