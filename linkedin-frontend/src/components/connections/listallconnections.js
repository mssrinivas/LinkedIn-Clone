import React, { Component } from 'react'
import axios from 'axios';
import './listallconnections.css';
import UserInfoCard from './UserInfoCard'


export default class listallconnections extends Component {
  constructor() {
    super();
    this.state = {
        data: [],
    };
    this.connectRequest=this.connectRequest.bind(this);
  
}
  componentWillMount(){
  console.log("will mount")
    this.loadMyNetworks();
    console.log("after mount")
  }
  loadMyNetworks(){
    var self = this;
        axios.get("http://localhost:3001/user/listallconnections?email=rashmi@gmail.com")
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

  connectRequest(user){
    //e.preventDefault();
    console.log("on hover selected",user);
    // data={

    // }
    axios.get("http://localhost:3001/user/requestconnection")
    .then(function (response) {
        console.log("response",response)
        // if(response.data.responseData!=null)
        // {
        //   this.setState({
        //     data: response.data.responseData,        
        // })
        // }
    })
  }
  render() {
    let userlist;
    const {data} = this.state;
    if(this.state.data!=null)
    {
    userlist = this.state.data.map(user => {
      console.log("USER-->",user)
      return(
        //<div>
          <UserInfoCard email={user.email} firstname={user.first_name} lastname={user.last_name}></UserInfoCard>
        //</div>  
        
      )
    })
  }
    return (
      <div class="col-lg-12 row">
      <div class="col-lg-4">
      <div class="card" style={{width: "19%",height: "86%",position: "fixed"}}>
  <span style={{fontSize: "30px",margin: "17% 7% 9% 37%"}}>830</span>
  <span style={{margin:"auto"}}>Your connections</span>
  <u style={{cursor:"pointer",margin:"auto"}}>see all</u>
  <span>Your contact import is ready</span>
<span>Connect with your contacts and never lose touch</span>
</div>
      </div>
      <div class="col-lg-8">
          <div className="row ">
            <div className="col-md-6">
              <div class="card" style={{border:'1px solid grey',width: "127%",height: "166%"}}>
                <div className="row">
                
                  <div className="col-md-3">
                  Profile Image
                  </div>

                  <div className="col-md-4">
                  <p>Mudambi Srinivas</p>
                  <p>Actively Seeking Internhsip Opportunities</p>
                  </div>

                  <div className="col-md-5" >
                    <button className="btn ">Ignore</button>
                    <button className="btn "style={{border: "1px solid #0073b1",color: "#0073b1"}}>Accept</button>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="outer-card" style={{marginTop : "10%"}}>
          <div class="row">
          {userlist}
          </div>
          </div>
          
          
        
      </div>
      </div>
    )
  }
}

