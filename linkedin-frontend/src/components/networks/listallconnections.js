import React, { Component } from 'react'
import axios from 'axios';
import './listallconnections.css';
import UserInfoCard from './UserInfoCard'
import Navbar from './../navbar/Navbar.jsx';
import PendingInvitation from './pendinginvitations';
import {connect} from 'react-redux';
import { Link } from "react-router-dom";

class listallconnections extends Component {
  constructor() {
    super();
    this.state = {
        data: [],
        count:0,
    };
    //this.connectRequest=this.connectRequest.bind(this);
  
}
  componentWillMount(){
  var self=this;
  if(self.props.currentUser.length>0)
  {
    self.setState({
      count:this.props.currentUserDetails.connections.length
    })
  }
    self.loadRecommendedNetworks();
    console.log("after mount")

  }
  loadRecommendedNetworks(){
    var self = this;
    console.log("hi")
     var id=this.props.currentUser;
     if(id){
        axios.get("http://localhost:3001/user/listallconnections?email="+id)
            .then(function (response) {
                console.log("response from list connections",response)
                if(response.data.responseData!=null)
                {
                  self.setState({
                    data: response.data.responseData,       
                })
                }
            })
  }
  }

  // connectRequest(user){
  //   console.log("on hover selected",user);
  //   axios.get("http://localhost:3001/user/requestconnection")
  //   .then(function (response) {
  //       console.log("response",response)
     
  //   })
  // }

  render() {
    let userlist;
    const {data} = this.state;
    if(this.state.data!=null)
    {
    userlist = this.state.data.map(user => {
      console.log("USER-->",user)
      return(
          <UserInfoCard email={user.email} firstname={user.first_name} lastname={user.last_name}></UserInfoCard>
      )
    })
  }
    return (
      <div>
      <Navbar></Navbar>
      <div class="col-lg-12 row">
      <div class="col-lg-4">
      <div class="cardneha" style={{width: "19%",height: "50%",position: "fixed", marginTop:"4%"}}>
  <h3 style={{textAlign:"center"}}><span style={{fontSize: "30px",color:"#0084bf"}}>{this.state.count}</span></h3>
 <b style={{textAlign:"center"}}> <span>Your connections</span></b>
  <Link to="/mynetwork/connections" style={{cursor:"pointer",margin:"auto", color:"#0084bf"}}>see all</Link>
</div>
      </div>
      <div class="col-lg-8">
          <div className="row ">
            <div className="col-md-6">
          <PendingInvitation ></PendingInvitation>
            </div>
          </div>
          <div class="outer-cardneha" style={{marginTop : "10%"}}>
          <div class="row">
          {userlist}
          </div>
          </div>     
      </div>
      </div>
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

export default connect(mapStateToProps)(listallconnections);