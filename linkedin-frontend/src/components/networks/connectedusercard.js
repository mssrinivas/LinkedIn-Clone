import React, { Component } from 'react'
import axios from 'axios';
import swal from 'sweetalert2';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';

 class connectedusercard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: [],
        };
      this.fetchConnectedUserDetails=this.fetchConnectedUserDetails.bind(this);
    }

    componentWillMount(){
        console.log("will mount")
          this.fetchConnectedUserDetails();
          console.log("after mount")
        }
      
    fetchConnectedUserDetails(){
        var self = this;
       if(self.props.currentUserDetails.connections.length>0){
        var pendingList= self.props.currentUserDetails.connections;
        console.log("friend list of neha",pendingList);
        if(pendingList.length>0){
              self.setState({
                friends:pendingList
              }) }
            }
          
        }


  render() {

const {friends} = this.state;

var friendlist=friends.map(friend=>{
console.log("friend is",friend)
    return ( 
        <div className="row justify-content-center" onClick={this.cardClicked} >
            <div className="col-md-2">

                <img class="rounded-circle" src={ require('../../images/avatar.png')} alt="Avatar" style={{width:"100%"}}/>
            </div>
            <div className="col-md-8">
                <Link to=""className="position-name" style={{color:'black',fontSize:'16px'}}> {friend.first_name} {friend.last_name} </Link>
                <div>
                <p className="company-name" style={{fontSize:'14px',color:'rgba(0,0,0,.6)'}} > {friend.experience} Software developer </p>
                </div>
            </div>
        </div>
     );

    }
    )

    return(
        <div>
     {friendlist}
        </div>
   
    )
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
  
  export default connect(mapStateToProps)(connectedusercard);