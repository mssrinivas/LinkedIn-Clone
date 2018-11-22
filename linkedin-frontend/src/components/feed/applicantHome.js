import React, { Component } from 'react';
import './feed.css';
import color from '@material-ui/core/colors/green';
import Navbar from './../navbar/Navbar.jsx';
class applicantHome extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="backC">
            <Navbar />
            {/* left div */}
            <div className="leftDiv">
                <div className="upperLeft">
                    <div className="leftPhoto"></div>
                </div>
                <div className="lowerLeft"></div>
            </div>
            {/* central div */}
            <div className="centralDiv">
                <div style={{height:'100px','background-color':'white', 'border-radius':'2px', 'box-shadow': '0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2)'}}>hello</div>
                <div style={{height:'300px','background-color':'white', 'margin-top':'30px', 'box-shadow': '0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2)'}}>bye</div>
                <div style={{height:'350px','background-color':'white', 'margin-top':'30px', 'box-shadow': '0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2)'}} >hey</div>
            </div>

            {/* right div */}
            <div className="rightDiv">
                <div className="upperLeft"></div>
                <div className="lowerLeft"></div>
            </div>
            
            </div>
         );
    }
}
 
export default applicantHome;