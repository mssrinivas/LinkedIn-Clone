import React, { Component } from 'react';
import { connect } from 'react-redux';

class ConnectionCard extends Component {
    
    constructor(props){
        super(props)

        this.connectionClicked = this.connectionClicked.bind(this);
    }

    connectionClicked =(e)=>{
        this.props.onConnectionClick(this.props.index);
    }


    render() { 

        const{person} = this.props;
        var shortChat = person.Chat.length==0 ? <p>No chats to show</p> : <p>{person.Chat[0]}</p>
        var username;
        // if(this.props.user.recruiter_flag == 0){
        //     username = <p>{person.Recruiter_First_name} {person.Recruiter_Last_name}</p>
        // }else {
        //     username = <p>{person.Applicant_First_name} {person.Applicant_Last_name}</p>
        // }
        if(this.props.user.first_name == person.From_First_name){
            username = <p>{person.To_First_name} {person.To_Last_name}</p>
        }else {
            username = <p>{person.From_First_name} {person.From_Last_name}</p>
        }
       
        return ( 
            <div className="row connection" onClick={this.connectionClicked} style={{ borderBottom: '1px solid #cdcfd2' }} >
                <div className="col-md-1"></div>
                <div className="col-md-1" style={{ padding: '4px' }}>
                    <img className="w-100 contain" src="https://img.icons8.com/color/100/7a7a7a/user.png" alt="" style={{ borderRadius: '50%', border: '1px solid #cdcfd2' }} />
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-7">
                    {/* <p>{person.First_name} {person.Last_name}</p> */}
                    {username}
                    {/* <p>{person.Chat.substring(0, person.Chat.length>10?10:person.Chat.length)}</p> */}
                    {shortChat}
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
export default connect(mapStateToProps)(ConnectionCard);
// export default ConnectionCard;