import React, { Component } from 'react'
import ConnectedUserCard from './connectedusercard.js';
import { Link } from "react-router-dom";
import Navbar from '../navbar/Navbar.jsx';
import {connect} from 'react-redux';

class showconnectedusers extends Component {
    constructor(props){
        super(props)
        this.state = {
            connectedUsers :[],
        }
    }

  render() {
      if(this.props.currentUser){
      const friends=this.props.currentUserDetails.connections
      console.log("list of connections",friends)   
 
    return (
      <div>
          <Navbar></Navbar>
         <div className="row" style={{marginTop:"5%",borderBottom: "1px solid #E0E0E0"}}>
                    <div className="col-md-1"></div>
                    <div className="cardneha w-75">
                               <ConnectedUserCard />
                    </div>
                    {/* <div className={descriptionClassName}>
                    </div> */}
                    <div className="col-md-1"></div>
                </div>

      </div>
    );
  
}
else{
    return(
        <div>
<Navbar></Navbar>
        </div>
    )
}
}
}

function mapStateToProps(state) {
    console.log("State",state);
      return {
         currentUser: state.LoginReducer.current_user,
         currentUserDetails: state.LoginReducer.currentUserDetails,
         userProfileDetails: state.LoginReducer.userProfileDetails
      };
  }
  
  export default connect(mapStateToProps)(showconnectedusers);