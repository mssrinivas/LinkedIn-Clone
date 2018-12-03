import React, { Component } from "react";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import uniqid from "uniqid";
import "./index.css";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import {submitMessage} from './../../api/Api';
import {Redirect} from 'react-router';
import {BASE_URL} from './../../components/constants/constants.js';
class Search extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      redirectVar : null
    };
    this.submitMessages = this.submitMessages.bind(this)
  }
  submitMessages = (ID, first_name, last_name, e) => {
    e.preventDefault();
    if (this.props.currentUser.recruiter_flag == 0){ //current user is applicant
      var values = {
        Applicant_id : this.props.currentUser._id,
        First_name : first_name,
        Last_name : last_name,
        Recruiter_id : ID,
        Message : ""
    }
    }else{
      var values = {   
        Recruiter_id : this.props.currentUser._id,
        First_name : first_name,
        Last_name : last_name,
        Applicant_id : ID,
        Message : ""
      }
    }
    // const values = {
    //   From_id : this.props.currentUser._id,
    //   To_id : ID,
    //   First_name : first_name,
    //   Last_name : last_name,
    //   Message : ""
    // }
    alert("Please Go to Messaging tab")
    axios.post(`${BASE_URL}/messages/startnew`, values)
                 .then((response ) => {
                     console.log("start new conversation status " ,response.status );
                     console.log("response", response.data);
                     //console.log("response data : " + JSON.stringify(response.data));
                     if(response.status === 200 && response.data == "Started Conversation"){
                            console.log("inside")
                            console.log("response", response.data);
                         
                         this.setState({
                          redirectVar : <Redirect to= "/messages"/>
                         })
                      
                     }
    });
    
}
  render() {
   
    let users_list = this.props.userSearch.map(user => {
      return (
        <div
          key={uniqid()}
          className="card-parent row container"
          style={{ margin: "auto" }}
        >
          <div className="col-lg-1">
            <div id="profile-image">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAUdSURBVFhH3VdpU1tVGGb84Iz+BEf9quP4E/zgjEsTslHazkilFZfWFkhCIQtLNbbWYqtlkUJWwpKQsJW1lEIWW0i40a4sOkXL1pYtZSkNgYQlr+dcz3RIvWRoucHRZ+aZ3DnnvM/75Jz3vDeJ+V+jLIX3rkUsKLZIRcNmseBxxdHYdXOqYMF6LM5VcYS7X6VSvUCW7ixMX3LesqQJb9XL4n39Ovn6TMsPsGwvhlC3nv4cqz4Jrdn7fVaJyKM9zH+ZhO0MKsUCTpVYsDhYnhMKdRsAXMzEc+4fjy5b0kSXSGj0UXmE97ZZIvB5m84ymnqa6106qJPFByqT+QFrmshTlsx5j0hFB1apaODPyq9CTGYiccl+HkYs30B1epzPJOanEzl2UZnC/aBBsdcHqM6YTGyF/s4isEiFfnwSRJY9WCTCsgG98pl2D5fCfFte2Bi+VFVSoYnIsgd0a+/PXTwXliwSH7XlQ518D9Rk7IZhs+rJODZcJRWNE1n2gPqcP+AoCTOxGUctJ6BWFg9Dzm9h/s55qFPEwz3UevDc6hUtmFJ4K0SWPVQkx67jPve0GWx6/mIeTNSfhj6dDJqPfwStJz8Gb28+wJyJ5kx/IdrJeHpt0KkGcyp/mciyB3T7fLgJY1PTDWeg41QSWI+JoFaxB5pVCdBx9lO4Zs6AyRuoDIixjaSMYrhdkg64TFDLGSOy7AGJ9k81fE/vVK387+NbnS5jNMNEb28BNGbtg1HrCWQwzklk2YNZIvypV5ux3vp1Aox2f8doIhJXJo1glvChJy85UJkSKyOy7OGCatepluMJIVMqDyXb+s5tJKpjdLPjQ825vAwiyx46dbELFqmATsKUfCvEsTXyOLDpYxeILHuwlXLn7UUHtm3wivoTsBu5c0SWPdiNPAtlPbC6XYOUNXHNYeSx/yaxad9/HX9zm4EDoVlmA5GIY2x6LthLY+exFpFlF5e1H76JdnI1OKljNBGJwUk9OlreSrth1xtELjpwlot6vAO5jCYicbr/NPxcIXATmejBpucdvt6S9JjJRCT+2njQ16nnfkFkooeec3tfcpTxpx7+fobRCBO9v+Wi4+VP1tbue5HIRBc2LecddBOXFoYKGA1t5KOhfHCUCRZxDAnfGdhLuVy0kzBEKWHt4T/fLGteIwz1KMBh5OPGzCFhO4tOPQeuNSWCs1wAA7YUWB7X0MTPeOx6cyLgNWT5zgMnnxrIgfFbSrh9KQndUiFN/IzH8NyOGkwvvvqaosQtydZTPZl6agInn+zPoY1sRrwGr80yeNwyjUuMNYgce1AUel5VailLppZaKrw46K+9OQvtd5fAcUECfR2HGI1h9l4+BM76NHptzc0ZKECxSGcpU0dVyYtcrxD57UGm7t6t0Lj9OudY0Hl/Dbqm4Amvjs6Cw3IQqKYkGKbSYKIviyZ+phrRjwI0h9dsjHHcWwWtYzSo0LoX00tcQpLm+aDUuDNySn/xtdzxhSUJ44MlcHaZwVnzGdiMApqO6s/pMTzHGIOINbMNnkWFxvV8f+Tlxe44VDf+zpEgYwI22DESoE3K1C4RSbs14JpTqN3+1sFFRmE2iXPg436mmszUeawax0iQSTAa1NpHAll6ykzSRwZuA0ptT8D5IPxCRJM4F865pRYkV7ulhW1/+JmEoskCdNYKdXcqsbE5svQed82NGUaRaLIa5cw2UF3ExubAXb/97jKjSDSJc+LcxMbmkJW4/IjwL9FPbPxXEBPzF8djv2n9deooAAAAAElFTkSuQmCC" />
            </div>
          </div>
          <div className="col-lg-5">
            <div id="name">
              <Link to="">{user.first_name +" " +user.last_name}</Link>
            </div>
            <br></br><br></br>
            <div>
              <span id="designation">San Jose</span>
              <span>
                <Link to="/messages" onClick = {this.submitMessages.bind(this, user._id, user.first_name, user.last_name)} className="btn message-btn">Message</Link>
              </span>
            </div>
            <div id="location">Systems </div>
            <div />
          </div>
        </div>
      );
    });
    return (
      
      <React.Fragment>
      {this.state.redirectVar}
        <Navbar />
        
        {users_list}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
    return {
        userSearch: state.LoginReducer.userSearch,
        currentUser : state.LoginReducer.currentUserDetails
    };

}
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ submitMessage }, dispatch);
// }
export default connect(mapStateToProps)(Search);