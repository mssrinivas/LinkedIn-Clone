import React, { Component } from 'react';
import { connect } from 'react-redux';
import './easyApply.css';
import serialize from 'form-serialize';

class EasyApplyModal extends Component {
    
    constructor(props){
        super(props);
        this.submitApplicationHandler = this.submitApplicationHandler.bind(this);
    }

    /*
    <div>
        <button className="btn btn-primary1" data-toggle="modal" data-target="#easyApplyModal">Easy Apply</button>
    </div>
    */

   submitApplicationHandler = (e)=>{
        e.preventDefault();
        console.log(e.target);
        var form = serialize(e.target, { hash: true });
        console.log(form);
        //this.props.onSubmitApplication(form);
   }

    render() { 

        const {user,company} = this.props;
        return ( 
            
            <div class="modal fade" id="easyApplyModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <form onSubmit={this.submitApplicationHandler}>
    <div class="modal-content">
      <div class="modal-header">
        <h4 className="modalhead">Apply to {company.CompanyName}</h4>
    </div>
        <div class="modal-body mx-3">
        <div className="spacing">
            <label for="firstname">FirstName</label>
            <input type="text" name="firstname" id="firstname" defaultValue={user.first_name} className="textemail"/>
        </div>
        <div className="spacing">
            <label for="lastname">LastName</label>
            <input type="text" name="lastname" id="lastname" defaultValue={user.last_name}  className="textemail"/>
        </div>
        <div className="spacing">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" defaultValue={user.email} className="textemail1"/>
        </div>
        <div className="spacing">
            <label for="resume">Resume</label>
            <input type="file" name="resume" id="resume" className="textemail2"/>
        </div>
        </div>
      <div class="modal-footer d-flex justify-content-center">
      <button className="but" data-dismiss="modal" >Cancel</button>
      <button className="but" type="submit">Submit Application</button>
      </div>
    </div>
    </form>
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

//export default EasyApplyModal;
export default connect(mapStateToProps,null)(EasyApplyModal);