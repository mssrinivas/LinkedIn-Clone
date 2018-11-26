import React, { Component } from 'react';


class ConnectionCard extends Component {
    
    constructor(props){
        super(props)
    }

    render() { 
        return ( 
            <div className="row connection" style={{ borderBottom: '1px solid #cdcfd2' }} >
                <div className="col-md-1"></div>
                <div className="col-md-2" style={{ padding: '4px' }}>
                    <img className="w-100 contain" src="https://img.icons8.com/color/100/7a7a7a/user.png" alt="" style={{ borderRadius: '50%', border: '1px solid #cdcfd2' }} />
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-7">
                    <p>Arihant Sai</p>
                </div>
            </div>
         );
    }
}
 
export default ConnectionCard;