import React, { Component } from 'react';
import Navbar from './../navbar/Navbar.jsx';
import ConnectionCard from './ConnectionCard/ConnectionCard.js';
import ChatCard from './ChatCard/ChatCard.js';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {history} from "../../util/utils";
// import {SendMessage} from './../../api/Api';
import {BASE_URL} from './../../components/constants/constants.js';

// var From_id="";
// var To_id="";

class Messages extends Component {

    constructor(props){
        super(props)
        this.state = {
            connections : [],
            connectionClickedIndex : 0,
            message:""
        }

        this.onConnectionClicked = this.onConnectionClicked.bind(this);
        this.userMessage = this.userMessage.bind(this);
        this.reply = this.reply.bind(this);

    }


    componentDidMount(){
        console.log("inside cwm")
        let ID = this.props.user._id;
        // if(this.props.user.recruiter_flag == 0){
        //     axios.get(`${BASE_URL}/messages/ainbox/`+ID)
        //          .then(response => {
        //              console.log("status " ,response.status );
        //              console.log("response", response.data);
        //              //console.log("response data : " + JSON.stringify(response.data));
        //              if(response.status === 200){
        //                     console.log("inside")
        //                     console.log("response", response.data);

        //                     var {connections} = this.state;

        //                  this.setState({
        //                      connections : connections.concat(response.data)
        //                  },()=>{
        //                      console.log("connection state  updated");
        //                      console.log(this.state.connections);
        //                  })


        //              }else {
        //                  alert("Could not fetch conversations!!")
        //              }
        // });
        // }else {
        //     axios.get(`${BASE_URL}/messages/rinbox/`+ID)
        //          .then(response => {
        //              console.log("status " ,response.status );
        //              console.log("response", response.data);
        //              //console.log("response data : " + JSON.stringify(response.data));
        //              if(response.status === 200){
        //                     console.log("inside")
        //                     console.log("response", response.data);

        //                  this.setState({
        //                      connections : this.state.connections.concat(response.data)
        //                  })

        //              }else {
        //                 alert("Could not fetch conversations!!")
        //             }
        // });
        // }
        axios.get(`${BASE_URL}/messages/ainbox/`+ID)
                 .then(response => {
                     console.log("status " ,response.status );
                     console.log("response", response.data);
                     //console.log("response data : " + JSON.stringify(response.data));
                     if(response.status === 200){
                            console.log("inside")
                            console.log("response", response.data);

                            var {connections} = this.state;

                         this.setState({
                             connections : connections.concat(response.data)
                         },()=>{
                             console.log("connection state  updated");
                             console.log(this.state.connections);
                         })


                     }
        });

    }

    onConnectionClicked(index){
            console.log(`Index at ${index} has been clicked `);
            this.setState({connectionClickedIndex : index});

    }

    userMessage=(e)=>{
        const message = e.target.value;
        this.setState({message});
    }

    reply =(e)=>{

            if(this.state.connectionClickedIndex==null){
                alert("Please select a connection")
                return
            }
            // if(this.props.user.recruiter_flag == 0){
            //     var values = {
            //         Applicant_id : this.props.user._id,
            //         Recruiter_id : this.state.connections[this.state.connectionClickedIndex].Recruiter_id,
            //         Message : this.props.user.first_name + ":" + this.state.message
            //     }
            // }else{
            //     var values = {
            //         Recruiter_id : this.props.user._id,
            //         Applicant_id : this.state.connections[this.state.connectionClickedIndex].Applicant_id,
            //         Message : this.props.user.first_name + ":" + this.state.message
            //     }
            // }
            const values = {
                Message : this.props.user.first_name + " : " + this.state.message,
                ID : this.state.connections[this.state.connectionClickedIndex]._id
            }
            // const userid = this.props.user._id;
            // const recruiterid = this.state.connections[this.state.connectionClickedIndex].Recruiter_id;
            // const message = this.state.message;
            // this.props.SendMessage(values)
            axios.post(`${BASE_URL}/messages/send`, values)
                .then(res => {
                console.log("response status : " + res.status);

                    if(res.status == 200){
                        var {connections,message,connectionClickedIndex} = this.state;
                        connections[connectionClickedIndex].Chat.concat(this.props.user.first_name + " : " + this.state.message);
                        this.setState({
                            connections,
                            message:""
                        },()=>{
                            console.log(this.state.connections);
                        })
                        //this.state.connections[this.state.connectionClickedIndex].Chat.concat(this.props.user.first_name + ":" + this.state.message);
                        alert("Message sent Successfully !!")
                    }
                    else
                    {alert("Oops !! Could not send Message!!")}
        })



    }

    render() {
      if(!localStorage.getItem('servertoken'))
      {
        history.push('/')
      }
        const {connections,connectionClickedIndex} = this.state;

        var chat = null;
        var connectionName = null;
        if(connections.length != 0){
            console.log("connections : " ,  connections[connectionClickedIndex])
            chat = connections[connectionClickedIndex].Chat.map((message,index)=>{
                return(<ChatCard key={index} text={message} />)
            });
            // if(this.props.user.recruiter_flag == 0){
            //     connectionName = <p className="clearfix" style={{fontSize:'18px',fontWeight:'bold',verticalAlign:'center'}}>{connections[connectionClickedIndex].Recruiter_First_name} {connections[connectionClickedIndex].Recruiter_Last_name}</p>
            // }else{
            //     connectionName = <p className="clearfix" style={{fontSize:'18px',fontWeight:'bold',verticalAlign:'center'}}>{connections[connectionClickedIndex].Applicant_First_name} {connections[connectionClickedIndex].Applicant_Last_name}</p>
            // }
            if(this.props.user.first_name == connections[connectionClickedIndex].From_First_name){
                connectionName = <p className="clearfix" style={{fontSize:'18px',fontWeight:'bold',verticalAlign:'center'}}>{connections[connectionClickedIndex].To_First_name} {connections[connectionClickedIndex].To_Last_name}</p>
            }else{
                connectionName = <p className="clearfix" style={{fontSize:'18px',fontWeight:'bold',verticalAlign:'center'}}>{connections[connectionClickedIndex].From_First_name} {connections[connectionClickedIndex].From_Last_name}</p>
            }
            // connectionName = <p className="clearfix" style={{fontSize:'18px',fontWeight:'bold',verticalAlign:'center'}}>{connections[connectionClickedIndex].First_name} {connections[connectionClickedIndex].Last_name}</p>

        }else{
            console.log("connections are zero");
            console.log(connections);
        }

        return (
            <div>
                <Navbar />

                <div className="row" style={{margin:'30px 10px 10px 30px',border:'1px solid #cdcfd2'}}>
                    <div className="col-md-5" style={{border:'1px solid #cdcfd2',height:'550px',overflowY:'scroll'}} >

                    <div style={{borderBottom:'1px solid #cdcfd2',height:'50px',padding:'0px'}}>
                            <p className="clearfix" style={{fontSize:'20px',fontWeight:'bold',verticalAlign:'center'}}>Messaging</p>
                    </div>

                    <div style={{borderBottom:'1px solid #cdcfd2',height:'40px'}}>
                            <img src="https://img.icons8.com/material-outlined/100/7a7a7a/search.png" alt="" height="25px" width="25px"/>
                            <input type="text" name="search" id="search-bar" placeholder="Search messages" style={{width:'90%',height:'100%',border:'none',background:'white'}} />
                    </div>
                        {
                            connections.map((connection,index)=>{
                                return( <ConnectionCard person={connection} onConnectionClick={this.onConnectionClicked} key={index} index={index} /> )
                            })
                        }

                        {/* <ConnectionCard />
                        <ConnectionCard />
                        <ConnectionCard />
                        <ConnectionCard />
                        <ConnectionCard />
                        <ConnectionCard />
                        <ConnectionCard />
                        <ConnectionCard />
                        <ConnectionCard /> */}

                    </div>
                    <div className="col-md-7" style={{border:'1px solid #cdcfd2',height:'500px'}}>

                    <div style={{borderBottom:'1px solid #cdcfd2',height:'50px',padding:'0px',margin:'0px'}}>
                            {connectionName}
                            {/* <p className="clearfix" style={{fontSize:'14px',fontWeight:'italic',verticalAlign:'center'}}>R&amp;D Engineer at Samsung</p> */}
                    </div>

                    <div style={{bottom:'122px',top:'50px',width:'95%',marginTop:'2px',padding:'0px 2px 0px 2px',margin:'0px',position:'absolute',overflowY:'scroll'}}>

                        {chat}
                        {/* <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard /> */}

                    </div>




                   <div style={{width:'95%',bottom:'42px',height:'80px' ,padding:'0px',position:'absolute'}}>
                        <textarea onChange={this.userMessage} placeholder="Write something" value={this.state.message} style={{height:'100%',width:'100%'}}></textarea>
                    </div>

                    <div style={{width:'95%',bottom:0,height:'40px' ,padding:'0px',position:'absolute'}}>
                        <button type="button" onClick={this.reply} style={{width:'100%',height:'100%',background:'#006097',color:'white',borderRadius:'5px'}}>Send</button>
                    </div>

                    </div>
                </div>
            </div>


         );
    }
}

const mapStateToProps = (state) =>{
    return {
        user : state.LoginReducer.currentUserDetails
    }
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({ SendMessage }, dispatch);
// }
// const mapDispatchToProps = (dispatch) =>{
//     return{
//         SavedCustomApply: (JobForCustomApply)=>{
//             dispatch({
//                 type:CUSTOM_APPLY_SAVED_JOB,
//                 payload : JobForCustomApply
//             });
//         }
//     }
// }

export default connect(mapStateToProps)(Messages);
