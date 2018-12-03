import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import './easyApply.css';
import serialize from 'form-serialize';


function ExistingResume(props){
    const{file,index} = props;
    const fields = file.split("/");
    var filename=fields.pop();
    var userid = fields.pop();
    const url = "/resumes/"+userid+"/"+filename;
    console.log("userid:"+userid+"-filename:"+filename);
    return(
        <div>
            <input type="radio" name="existingresume" value={index} /> <Link to={url} target="_blank">{filename}</Link>   
        </div>
    );
}

class EasyApplyModal extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            file : null
        }
        this.submitApplicationHandler = this.submitApplicationHandler.bind(this);
        this.resumeUploadedHandler = this.resumeUploadedHandler.bind(this);
    }

    /*
    <div>
        <button className="btn btn-primary1" data-toggle="modal" data-target="#easyApplyModal">Easy Apply</button>
    </div>
    */

   resumeUploadedHandler =(e)=>{
        
    this.setState({ file : e.target.files[0] });
}

submitApplicationHandler = (e)=>{
    e.preventDefault();
    var form = serialize(e.target, { hash: true });
    const {file} = this.state;
    
    if(file==null && form.existingresume==null){
        alert("You cannot apply without a resume");
        return;
    }

    if(file != null){
        if(file.name.slice(-3) !="pdf"){
            alert("Please upload a pdf file");    
        }else{
            const newForm = Object.assign({},form,{file});
            this.props.onSubmitApplication(newForm);
        }
        
    }
    else{
        this.props.onSubmitApplication(form);
    }

    
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
            <label for="previous-resume">Previous resume</label>
            {
                user.resume_path.map((filename,index)=>{
                    return( <ExistingResume key={index} file={filename} index={index} />  );
                })
            
            }
        </div>

        <div className="spacing">
            <label for="resume">Resume</label>
            <input onChange={this.resumeUploadedHandler} type="file" name="files" id="resume" accept="application/pdf"  className="textemail2"/>
        </div>
        </div>
      <div class="modal-footer d-flex justify-content-center">
      <button className="but" onClick={console.log("hello dismiss modal")} data-dismiss="modal" >Cancel</button>
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