import React, { Component } from 'react'
import axios from 'axios';
import swal from 'sweetalert2';

export default class UserInfoCard extends Component {
    constructor(props){
        super(props);
        this.state={
            buttonDisabled:true
        }
        this.RequestConnection=this.RequestConnection.bind(this);
      }

      RequestConnection = (email) => {
        console.log("EMAIL IS",email)
        var data={
            from:"neha@gmail.com",
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

    var button=<input disabled style={{margin: "5% 12% 11% 24%",border: "1px solid #0073b1",color: "#0073b1"}} type="button" name="connect" value="Connect" onClick={()=>this.RequestConnection(this.props.email)}></input>
    if(this.buttonDisabled!=true)
{
    button=<input style={{margin: "5% 12% 11% 24%",border: "1px solid #0073b1",color: "#0073b1"}} type="button" name="connect" value="Connect" onClick={()=>this.RequestConnection(this.props.email)}></input>
}
 
    return (
            //<div>
    <div class="card">
  <img src={ require('../../images/img_avatar.png')} alt="Avatar" style={{width:"100%"}}/>
  <div class="container">
    <b ><a style={{fontSize: "100%", color:"black"}} href="#" >{this.props.firstname} {this.props.lastname}</a></b> 
    <p style={{margin:"auto"}}>Architect & Engineer</p> 
  </div>
  
  <div>
  {button}
  </div>
</div>
      //</div>
      
    )
   

  }
}
