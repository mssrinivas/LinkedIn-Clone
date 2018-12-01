import React, { Component } from 'react';

class ChatCard extends Component {
    
    constructor(props){
        super(props)
    }

    //https://img.icons8.com/color/100/7a7a7a/user.png

    render() { 
        const {text} = this.props;
        console.log("Message "+text);
        return ( 
            <div class="row mt-2" style={{ width: '100%' }}>
                <div className="col-md-1"></div>
                <div className="col-md-2">
                    <img className="w-100 contain" src="https://img.icons8.com/color/100/7a7a7a/user.png" alt="User Image" style={{ borderRadius: '50%', border: '1px solid #cdcfd2' }} />
                </div>
                <div className="col-md-7">
                    <p style={{ fontSize: '15px', fontWeight: 'bold' }}>User Name</p>
                    <p style={{ fontSize: '13px' }}>{text}</p>
                </div>
            </div>
         );
    }
}
 
export default ChatCard;