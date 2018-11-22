import React,{Component} from 'react';
import './JobDescription.css'
import { Container, Row, Col, Button, Fa, Card, CardBody, Dropdown, DropdownToggle, DropdownItem, DropdownMenu, ModalFooter } from 'mdbreact';
class JobDescription extends Component {

	 constructor(props) {
	    super(props);
  }
	componentDidMount() {
    
	}
	render ()
	{
        
	return (
	<div>
	<Container >
        <section className="form-elegant">
          <Row >
            <Col md="12" className="mx-auto shadowingcontainer">
              <Card>
                <CardBody className="mx-12 col-md-12 col-sm-8 col-xs-12 forum">
                    <div class="form-group"> 
                    <p class="font-weight-bold ">Step 1: What job do you want to post?</p>
                    <br />
                    <div class="row">
                    <div class="col-md-4 mb-4">
                   <p class="font-weight-bold smally">Company</p>
                    <input className="form-control smally" type="text" placeholder="Company Name" name="Company" value={this.props.Company} onChange={this.props.Change}></input>
                    </div>
                    <div class="col-md-4 mb-4">
                    <p class="font-weight-bold smally">Job Title</p>
                    <select class="form-control widthdropdown smally" id="exampleFormControlSelect1" name="JobTitle" value={this.props.JobTitle} onChange={this.props.Change}>
				      <option>Software Designer</option>
				      <option>Software Programmer</option>
				      <option>Team Lead</option>
				      <option>Cheif Executive Officer</option>
				    </select>
                    </div>
                    <div class="col-md-3 mb-3">
                    <p class="font-weight-bold smally">Location</p>
                    <select class="form-control widthdropdown smally" id="exampleFormControlSelect1" name="Location" value={this.props.Location} onChange={this.props.Change}>
				      <option>San Francisco</option>
				      <option>New York</option>
				      <option>Boston</option>
				      <option>Texas</option>
				      <option>Chicago</option>
				    </select>
                    </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4 mb-4">
                    <p class="font-weight-bold smally">Seniority Level</p>
                    <select class="form-control widthdropdown smally" id="exampleFormControlSelect1" name="SeniorityLevel" value={this.props.SeniorityLevel} onChange={this.props.Change}>
				      <option>Internship</option>
				      <option>Mid-Level</option>
				      <option>Senior Level</option>
				      <option>Director</option>
				    </select>
                    </div>
                    </div>
                    <div class="row">
                    <div class="col-md-4 mb-4">
                    <p class="font-weight-bold smally">Job Function</p>
                    <select class="form-control widthdropdown smally" id="exampleFormControlSelect1" name="JobFunction" value={this.props.JobFunction} onChange={this.props.Change}>
				      <option>Quality Assurance</option>
				      <option>Analyst</option>
				      <option>Full Stack Developer</option>
				      <option>Strategy/Planning</option>
				    </select>
                    </div>
                    <div class="col-md-4 mb-4">
                    <p class="font-weight-bold smally">Employment Type</p>
                    <select class="form-control widthdropdown smally" id="exampleFormControlSelect1" name="EmploymentType" value={this.props.EmploymentType} onChange={this.props.Change}>
				      <option>Full Time</option>
				      <option>Part Time</option>
				      <option>Internship</option>
				      <option>Contractor</option>
				      <option>Temporary</option>
                      <option>Volunteer</option>
				    </select>
                    </div>
                    <div class="col-md-3 mb-3">
                    <p class="font-weight-bold smally">Industry Type</p>
                    <select class="form-control widthdropdown smally" id="exampleFormControlSelect1" name="Industry" value={this.props.Industry} onChange={this.props.Change}>
				      <option>Information Technology</option>
				      <option>Accounting</option>
				      <option>Electronics</option>
				      <option>Mechanical Industry</option>
				      <option>Aviation</option>
                      <option>Automotive</option>
                      <option>Arts & Business</option>
                      <option>Banking</option>
				    </select>
                    </div>
                    </div>
                    <div class="row">
                        <div class="mb-4">
                        <p class="font-weight-bold smally">Job Description</p>
                        <textarea type="textarea" class="form-control form-control-lg font-weight-bold smally textareawidth" name="JobDescription" placeholder="" value={this.props.JobDescription} onChange={this.props.Change} />
                        <div class="invalid-feedback">
                        </div>
                        <br />
                        <p class="font-weight-bold smally">Recommended Mail</p>
                        <input className="form-control form-control-sm smally" type="text" name="RecommendedMail" placeholder="Email Address" value={this.props.RecommendedMail} onChange={this.props.Change}></input>
                    </div>
                    </div>
                    </div>
                </CardBody>     
              </Card>
            </Col>
          </Row>
        </section>
      </Container>
      
 	</div>
		);
	}
}


export default JobDescription;
