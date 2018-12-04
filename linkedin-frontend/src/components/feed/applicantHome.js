import React, { Component } from 'react';
import './feed.css';
import color from '@material-ui/core/colors/green';
import Navbar from './../navbar/Navbar.jsx';
import LinkedInLogo1 from "./linkedin_logo_1.png";
import { connect } from "react-redux";
import {history} from "../../util/utils";
class applicantHome extends Component {
    state = {  }
    render() {
      if(!localStorage.getItem('servertoken'))
      {
        history.push('/')
      }
        return (
            <div className="backC">
            <Navbar />
            {/* left div */}
            <div className="leftDiv">
                <div className="upperLeft">
                    <div className="leftPhoto">
                        {/* <img src={this.props.user.profile_img}/> */}
                        <img className="leftPhoto2" src={this.props.user.profile_img}/>
                    </div><br/>
                    <p style={{"margin-left":"75px","font-weight":"bold" }} >{this.props.user.first_name} {this.props.user.last_name}</p><br/>
                    <p style={{"margin-left":"10px"}} >{this.props.user.headline}</p>
                </div>
                <div className="lowerLeft">
                <p style={{"margin-left":"16px","font-size":"20px" }}>Your communities</p><hr/>
                <p style={{"font-size":"13px", "font-weight":"bold"}} >
                    <span style={{"width": "8px","height": "8px","border-radius": "50%", "display": "inline-block","background-color": "#65c3e8","margin-right": "8px", "margin-left": "12px" }} aria-role="presentation"></span>#India
                </p><br/>
                <p style={{"font-size":"13px", "font-weight":"bold"}} >
                    <span style={{"width": "8px","height": "8px","border-radius": "50%", "display": "inline-block","background-color": "#65c3e8","margin-right": "8px", "margin-left": "12px" }} aria-role="presentation"></span>#clouds
                </p><br/>
                <p style={{"font-size":"13px", "font-weight":"bold"}} >
                    <span style={{"width": "8px","height": "8px","border-radius": "50%", "display": "inline-block","background-color": "#65c3e8","margin-right": "8px", "margin-left": "12px" }} aria-role="presentation"></span>#virtualrealitycomputers
                </p><br/>
                <p style={{"font-size":"13px", "font-weight":"bold"}} >
                    <span style={{"width": "8px","height": "8px","border-radius": "50%", "display": "inline-block","background-color": "#65c3e8","margin-right": "8px", "margin-left": "12px" }} aria-role="presentation"></span>#Summer Internship 2019
                </p><br/>
                <p style={{"font-size":"13px", "font-weight":"bold"}} >
                    <span style={{"width": "8px","height": "8px","border-radius": "50%", "display": "inline-block","background-color": "#65c3e8","margin-right": "8px", "margin-left": "12px" }} aria-role="presentation"></span>#Alumni of COEP
                </p><br/>
                <p style={{"font-size":"13px", "font-weight":"bold"}} >
                    <span style={{"width": "8px","height": "8px","border-radius": "50%", "display": "inline-block","background-color": "#65c3e8","margin-right": "8px", "margin-left": "12px" }} aria-role="presentation"></span>#machinelearning
                </p><br/>
                </div>
            </div>
            {/* central div */}
            <div className="centralDiv">
                <div style={{height:'100px','background-color':'white', 'border-radius':'2px', 'box-shadow': '0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2)'}}>
                   <br/><p style={{"margin-left":"20px"}}>Share an article, photo, video or idea</p>

                       <button style={{'border-radius':'20px', 'width':'30%', 'height':'30%', 'margin-left':'20px', 'margin-top':'15px'}}>Write an article</button>
                       <button style={{'border-radius':'20px', 'width':'20%', 'height':'30%', 'margin-left':'20px', 'margin-top':'15px'}}>Images</button>
                       <button style={{'border-radius':'20px', 'width':'20%', 'height':'30%', 'margin-left':'20px', 'margin-top':'15px'}}>Videos</button>

                </div>
                <div style={{height:'700px','background-color':'white', 'margin-top':'30px', 'box-shadow': '0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2)'}}>
                <img className="leftPhoto1" src="https://media.licdn.com/dms/image/C510BAQEeoSmuF7dMwQ/company-logo_400_400/0?e=1551312000&v=beta&t=1on7vcIQJpRbC6dkUxp0diM--gT9uELMrKKW4szKejg"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{fontSize:'24px'}}>Checkit.net</span>
                <p className="follow" style={{fontSize:'14px'}}>500 Followers</p>
                <br/>
                <p style={{"margin-left":"16px"}}>How can you improve compliance, visibility and control over your food service</p>
                <p style={{"margin-left":"16px"}}>daily operations? Find out how digital approaches can help you optimize</p>
                <p style={{"margin-left":"16px"}}>performance. Download our eBook.</p><br/>
                <img style={{"height":"400px"}}src="https://media.licdn.com/media-proxy/ext?w=1024&h=535&f=pj&hash=ReFhuhFXc3xQeIfZDonBlgIcGcg%3D&ora=1%2CaFBCTXdkRmpGL2lvQUFBPQ%2CxAVta5g-0R6jnhodx1Ey9KGTqAGj6E5DQJHUA3L0CHH05IbfPWjueJLferGgo0BAK34EjQBmLO-1EmGwQI7tf47mKIhzjsTsdcX5agYUbhl4j3lK6w"/>
                </div>
                {/* <div style={{height:'350px','background-color':'white', 'margin-top':'30px', 'box-shadow': '0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2)'}} >hey</div> */}
            </div>

            {/* right div */}
            <div className="rightDiv">
                <div className="upperLeft">

                    <p style={{"font-size":"14px"}}>What people are talking about now</p><br/>
                    <p style={{"font-size":"13px", "font-weight":"bold"}} >
                        <span style={{"width": "8px","height": "8px","border-radius": "50%", "display": "inline-block","background-color": "#65c3e8","margin-right": "8px", "margin-left": "12px" }} aria-role="presentation"></span>Report: Unilever to buy GSK unit
                    </p><br/>
                    <p style={{"font-size":"13px", "font-weight":"bold"}} >
                        <span style={{"width": "8px","height": "8px","border-radius": "50%", "display": "inline-block","background-color": "#65c3e8","margin-right": "8px", "margin-left": "12px" }} aria-role="presentation"></span>What’s next for the housing market?
                    </p><br/>
                    <p style={{"font-size":"13px", "font-weight":"bold"}} >
                        <span style={{"width": "8px","height": "8px","border-radius": "50%", "display": "inline-block","background-color": "#65c3e8","margin-right": "8px", "margin-left": "12px" }} aria-role="presentation"></span>Another generic EpiPen lands in US
                    </p><br/>
                    <p style={{"font-size":"13px", "font-weight":"bold"}} >
                        <span style={{"width": "8px","height": "8px","border-radius": "50%", "display": "inline-block","background-color": "#65c3e8","margin-right": "8px", "margin-left": "12px" }} aria-role="presentation"></span>Condé Nast CEO to exit
                    </p><br/>
                    <p style={{"font-size":"13px", "font-weight":"bold"}} >
                        <span style={{"width": "8px","height": "8px","border-radius": "50%", "display": "inline-block","background-color": "#65c3e8","margin-right": "8px", "margin-left": "12px" }} aria-role="presentation"></span>More farms make bankruptcy filings
                    </p><br/>
                    <p style={{"font-size":"13px", "font-weight":"bold"}} >
                        <span style={{"width": "8px","height": "8px","border-radius": "50%", "display": "inline-block","background-color": "#65c3e8","margin-right": "8px", "margin-left": "12px" }} aria-role="presentation"></span>Uber fined over data breach
                    </p><br/>
                </div>
                <div className="lowerLeft"><br/>
                    <span style={{"font-size":"13px", "margin-left":"13px"}}>About</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span style={{"font-size":"13px"}}>Help Center</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span style={{"font-size":"13px"}}>Privacy & Terms</span><br/><br/>
                    <span style={{"font-size":"13px","margin-left":"40px"}}>Advertising</span>&nbsp;&nbsp;&nbsp;
                    <span style={{"font-size":"13px"}}>Business Services</span><br/><br/>
                    <span style={{"font-size":"13px","margin-left":"40px"}}>Get the Linkedin app</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span style={{"font-size":"13px"}}>More</span><br/><br/>
                    <span style={{"font-size":"13px", "margin-left":"10px","font-weight":"bold" }}>Linked</span>
                    <img
                     style={{
                height: 15,
                marginRight: 20,
              }}
                    src={LinkedInLogo1}
                    alt="linkedin"/>

                    <span style={{"font-size":"13px"}}>LinkedIn Corporation © 2018</span>
                </div>
            </div>

            </div>
         );
    }
}
const mapStateToProps = state => {
    return {
        user : state.LoginReducer.currentUserDetails,

     };
  };

// function mapDispatchToProps(dispatch) {
//       return bindActionCreators({ customApplyJob }, dispatch);
// }

export default connect(mapStateToProps)(applicantHome);
