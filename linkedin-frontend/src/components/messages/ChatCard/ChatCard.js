import React, { Component } from 'react';

class ChatCard extends Component {
    
    constructor(props){
        super(props)
    }
    render() { 
        return ( 
            <div class="row mt-2" style={{ width: '100%' }}>
                <div className="col-md-1"></div>
                <div className="col-md-2">
                    <img className="w-100 contain" src="https://img.icons8.com/color/100/7a7a7a/user.png" alt="" style={{ borderRadius: '50%', border: '1px solid #cdcfd2' }} />
                </div>
                <div className="col-md-7">
                    <p style={{ fontSize: '15px', fontWeight: 'bold' }}>Arihant Sai</p>
                    <p style={{ fontSize: '13px' }}>Hi how are you</p>
                </div>
            </div>
         );
    }
}
 
export default ChatCard;