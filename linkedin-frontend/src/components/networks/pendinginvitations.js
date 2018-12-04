import React, { Component } from 'react'
import axios from 'axios';
import swal from 'sweetalert2';
import {connect} from 'react-redux';
import './listallconnections.css';

class pendinginvitations extends Component {
  constructor(props) {
    super(props);
    this.state = {
        pending: [],
    };
  this.loadPendingInvitations=this.loadPendingInvitations.bind(this);
  this.ignoreRequest=this.ignoreRequest.bind(this);
  this.acceptRequest=this.acceptRequest.bind(this);
}


componentDidMount(){
  console.log("will mount")
    this.loadPendingInvitations();
    console.log("after mount")
  }

loadPendingInvitations(){
  var self = this;
 if(self.props.currentUser.length>0){
  var pendingList= this.props.currentUserDetails.pending;
        if(pendingList.length>0){
        self.setState({
          pending:pendingList
        }) }
      }
    }

 ignoreRequest(email)
 {
  var self=this;
  //e.preventDefault();
  console.log("Ignored....");
  var data={
  ans:"Reject",
  to: this.props.currentUser,
  toUserDetails:this.props.currentUserDetails,
  from:email
  }

  axios.post("http://localhost:3001/user/respondtorequest",data)
  .then(function (response) {
      console.log("response in pending card",response)
      if(response.status==200){
        self.setState({
          pending:response.data.notifData.pending
        }) }
  })
  //self.props.onSubmitHandle(data);

 }

 acceptRequest(email) {
 //e.preventDefault();
 var self=this;
  console.log("Accepted....");
  var data={
    ans:"Accept",
    to: this.props.currentUser,
    toUserDetails:this.props.currentUserDetails,
    from:email
      }
  axios.post("http://localhost:3001/user/respondtorequest",data)
  .then(function (response) {
      console.log("response",response)
      if(response.status==200){
        //this.props.count=response.data.notifData.pending.length;
        self.setState({
          pending:response.data.notifData.pending
        }) }
  })
  // self.props.onSubmitHandle(data);
  // // self.setState({
  // //   pending:self.props.userNetworks.data.notifData.pending
  // // }) 
 }


  render() {
    let pendingInvitations;
    const {pending} = this.state;
    if(pending.length>0){
    pendingInvitations = pending.map(user => {
      console.log("USER-->",user)
    return (
      <div>
             <div class="card" style={{border:'1px solid grey',width: "127%",height: "166%",marginTop:"13%"}}>
                <div className="row">         
                  <div className="col-md-3" style={{margin:"auto"}}>
                  <img class="rounded-circle center" src={ require('../../images/avatar.png')} alt="Avatar" style={{width:"75%"}}/>
                  </div>

                  <div className="col-md-4">
                  <b>{user.first_name} {user.last_name}</b>
                  <p>Actively Seeking Internhsip Opportunities</p>
                  </div>

                  <div className="col-md-5" >
                    <button className="btn " onClick={()=>this.ignoreRequest(user.email)}>Ignore</button>
                    <button className="btn "style={{border: "1px solid #0073b1",color: "#0073b1"}} onClick={()=>this.acceptRequest(user.email)}>Accept</button>
                  </div>
                </div>

              </div>
      </div>
     
    )
    
  });
}

  return(
    <div>
      <div style={{marginTop : "10%"}}>
       {pendingInvitations}
       </div>
    </div>
  )
}
}



const mapStateToProps = (state)  => {
  console.log("State",state);
    return {
       currentUser: state.LoginReducer.current_user,
       currentUserDetails: state.LoginReducer.currentUserDetails,
       userProfileDetails: state.LoginReducer.userProfileDetails,
       //userNetworks: state.LoginReducer.userNetworks
    };
}

// const mapDispatchStateToProps = dispatch => {
//  // var self=this;
//   return {
//       onSubmitHandle : (data) => {
//           axios.post('http://localhost:3001/user/respondtorequest', data)
//           .then((response) => {
//               // window.location.href = "http://localhost:3000/dashboard";
//               console.log("resposne is ",response)
//               if (response.status === 200) {
//               console.log("response fetched..", response)
//               dispatch({type: 'RESPOND_TO_FRIEND_REQUEST', payload : response})
//               }
//           });
//       }
//   }
// }


export default connect(mapStateToProps)(pendinginvitations);