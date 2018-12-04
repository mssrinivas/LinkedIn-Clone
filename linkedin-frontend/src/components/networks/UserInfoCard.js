import React, { Component } from 'react'
import axios from 'axios';
import swal from 'sweetalert';
import {connect} from 'react-redux';

class UserInfoCard extends Component {
    constructor(props){
        super(props);
        this.state={
            buttonDisabled:true
        }
        this.RequestConnection=this.RequestConnection.bind(this);
      }

      RequestConnection = (email) => {
        console.log("EMAIL IS",email)
        console.log("current user IS",this.props.currentUser)
        var data={
            from:this.props.currentUser,
            fromDetails:this.props.currentUserDetails,
            to:email,
        }
        axios.post("http://localhost:3001/user/requestconnection",data)
        .then(function (response) {
            console.log("response",response.data.notifData.body)
            // this.setState({
            //     buttonDisabled:false
            // })
            swal("Request Sent", "Request Sent", 'success');
        })
      }
      
  render() {

    var button=<input disabled style={{margin: "12% 11% 24%",border: "1px solid #0073b1",color: "#0073b1",width:"50%"}} type="button" name="connect" value="Connect" onClick={()=>this.RequestConnection(this.props.email)}></input>
    if(this.buttonDisabled!=true)
{
    button=<input style={{margin: "12% 11% 24%",border: "1px solid #0073b1",color: "#0073b1", width:"50%"}} type="button" name="connect" value="Connect" onClick={()=>this.RequestConnection(this.props.email)}></input>
}
 
    return (
            //<div>
    <div class="card">
  <img class="rounded-circle center" src={ require('../../images/avatar.png')} alt="Avatar" style={{width:"75%"}}/>
  <div class="container">
<center> 
    <b ><a style={{fontSize: "100%", color:"black"}} href="#" >{this.props.firstname} {this.props.lastname}</a></b> 
    <p style={{margin:"auto"}}>Architect & Engineer</p> 
    </center> 
  </div>
  
  <div>
      <center>
  {button}
  </center>
  </div>
</div>
      //</div>
      
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

  export default connect(mapStateToProps)(UserInfoCard);
