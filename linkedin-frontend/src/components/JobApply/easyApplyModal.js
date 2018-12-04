import React, { Component } from 'react';
import './apply.css';
class easyApplyModal extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
            <div>
                <button className="btn btn-primary1" data-toggle="modal" data-target="#easyApplyModal">Easy Apply</button>
                </div>
            <div class="modal fade" id="easyApplyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4 className="modalhead">Apply to Mozilla</h4>
    </div>
        <div class="modal-body mx-3">
        <div className="spacing">
            <label for="firstname">FirstName</label>
            <input type="text" id="firstname" value="Sayali" className="textemail"/>
        </div>
        <div className="spacing">
            <label for="lastname">LastName</label>
            <input type="text" id="lastname" value="Sayali" className="textemail"/>
        </div>
        <div className="spacing">
            <label for="email">Email</label>
            <input type="email" id="email" value="saypatil12345@yahoo.com" className="textemail1"/>
        </div>
        <div className="spacing">
            <label for="resume">Resume</label>
            <input type="file" id="resume" className="textemail2"/>
        </div>
        </div>
      <div class="modal-footer d-flex justify-content-center">
      {/* <button className="but" data-dismiss="modal" >Cancel</button> */}
      <button type="button" className="but" data-dismiss="modal">Cancel</button>
      <button className="but" type="submit">Submit Application</button>
      </div>
    </div>
  </div>
</div>
</div>
         );
    }
}
 
export default easyApplyModal;