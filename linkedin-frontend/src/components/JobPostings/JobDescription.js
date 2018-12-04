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
                    <input className="form-control smally" type="text" placeholder="Company Name" name="Company" value={this.props.Company} onChange={this.props.Change} required></input>
                    </div>
                    <div class="col-md-4 mb-4">
                    <p class="font-weight-bold smally">Job Title</p>
                    <select class="form-control widthdropdown smally" id="exampleFormControlSelect1" name="JobTitle" value={this.props.JobTitle} onChange={this.props.Change} required>
              <option>Select a Job Title</option>
              <option>Software Designer</option>
				      <option>Software Programmer</option>
				      <option>Team Lead</option>
				      <option>Cheif Executive Officer</option>
              <option>Cloud Architect</option>
              <option>Cloud Consultant</option>
              <option>Cloud Product and Project Manager</option>
              <option>Cloud Services Developer</option>
              <option>Cloud Software and Network Engineer</option>
              <option>Cloud System Administrator</option>
              <option>Cloud System Engineer</option>
              <option>Computer and Information Research Scientist</option>
              <option>Computer and Information Systems Manager</option>
              <option>Computer Network Architect</option>
              <option>Computer Systems Analyst</option>
              <option>Computer Systems Manager</option>
              <option>IT Analyst</option>
              <option>IT Coordinator</option>
              <option>Network Administrator</option>
              <option>Network Architect</option>
              <option>Network and Computer Systems Administrator</option>
              <option>Network Engineer</option>
              <option>Network Systems Administrator</option>
              <option>Senior Network Architect</option>
              <option>Senior Network Engineer</option>
              <option>Senior Network System Administrator</option>
              <option>Telecommunications Specialist</option>
              <option>Chief Information Officer (CIO)</option>
              <option>Chief Technology Officer (CTO)</option>
              <option>Director of Technology</option>
              <option>IT Director</option>
              <option>IT Manager</option>
              <option>Management Information Systems Director</option>
              <option>Technical Operations Officer</option>
              <option>Application Developer</option>
              <option>Applications Engineer</option>
              <option>Associate Developer</option>
              <option>Computer Programmer</option>
              <option>Developer</option>
              <option>Java Developer</option>
              <option>Junior Software Engineer</option>
              <option>.NET Developer</option>
              <option>Programmer</option>
              <option>Programmer Analyst</option>
              <option>Senior Applications Engineer</option>
              <option>Senior Programmer</option>
              <option>Senior Programmer Analyst</option>
              <option>Senior Software Engineer</option>
              <option>Senior System Architect</option>
              <option>Senior System Designer</option>
              <option>Senior Systems Software Engineer</option>
              <option>Software Architect</option>
              <option>Software Developer</option>
              <option>Software Engineer</option>
              <option>Software Quality Assurance Analyst</option>
              <option>System Architect</option>
              <option>Systems Software Engineer</option>
              <option>Front End Developer</option>
              <option>Senior Web Administrator</option>
              <option>Senior Web Developer</option>
              <option>Web Administrator</option>
              <option>Web Developer</option>
              <option>Webmaster</option>
				    </select>
                    </div>
                    <div class="col-md-3 mb-3">
                    <p class="font-weight-bold smally">State</p>
                    <select class="form-control widthdropdown smally" id="exampleFormControlSelect1" name="State" value={this.props.State} onChange={this.props.Change} required>
              <option>Select a State</option>
              <option>Alabama	AL</option>
              <option>Alaska	AK</option>
              <option>Arizona	AZ</option>
              <option>Arkansas	AR</option>
              <option>California	CA</option>
              <option>Colorado	CO</option>
              <option>Connecticut	CT</option>
              <option>Delaware	DE</option>
              <option>Florida	FL</option>
              <option>Georgia	GA</option>
              <option>Hawaii	HI</option>
              <option>Idaho	ID</option>
              <option>Illinois	IL</option>
              <option>Indiana	IN</option>
              <option>Iowa	IA</option>
              <option>Kansas	KS></option>
              <option>Kentucky	KY</option>
              <option>Louisiana	LA</option>
              <option>Maine	ME</option>
              <option>Maryland	MD</option>
              <option>Massachusetts	MA</option>
              <option>Michigan	MI</option>
              <option>Minnesota	MN</option>
              <option>Mississippi	MS</option>
              <option>Missouri	MO</option>
              <option>Montana	MT</option>
              <option>Nebraska	NE</option>
              <option>Nevada	NV</option>
              <option>New Hampshire	NH</option>
              <option>New Jersey	NJ</option>
              <option>New Mexico	NM</option>
              <option>New York	NY</option>
              <option>North Carolina	NC</option>
              <option>North Dakota	ND</option>
              <option>Ohio	OH</option>
              <option>Oklahoma	OK</option>
              <option>Oregon	OR</option>
              <option>Pennsylvania	PA</option>
              <option>Rhode Island	RI</option>
              <option>South Carolina	SC</option>
              <option>South Dakota	SD</option>
              <option>Tennessee	TN</option>
              <option>Texas	TX</option>
              <option>Utah	UT</option>
              <option>Vermont	VT</option>
              <option>Virginia	VA</option>
              <option>Washington	WA</option>
              <option>West Virginia	WV</option>
              <option>Wisconsin	WI</option>
              <option>Wyoming	WY</option>
				    </select>
                    </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4 mb-4">
                    <p class="font-weight-bold smally">Seniority Level</p>
                    <select class="form-control widthdropdown smally" id="exampleFormControlSelect1" name="SeniorityLevel" value={this.props.SeniorityLevel} onChange={this.props.Change} required>
              <option>Select Seniority Level</option>
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
                    <select class="form-control widthdropdown smally" id="exampleFormControlSelect1" name="JobFunction" value={this.props.JobFunction} onChange={this.props.Change} required>
              <option>Select Job Function</option>
              <option>Quality Assurance</option>
				      <option>Analyst</option>
				      <option>Full Stack Developer</option>
				      <option>Strategy/Planning</option>
				    </select>
                    </div>
                    <div class="col-md-4 mb-4">
                    <p class="font-weight-bold smally">Employment Type</p>
                    <select class="form-control widthdropdown smally" id="exampleFormControlSelect1" name="EmploymentType" value={this.props.EmploymentType} onChange={this.props.Change} required>
              <option>Select EmploymentType</option>
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
                    <select class="form-control widthdropdown smally" id="exampleFormControlSelect1" name="Industry" value={this.props.Industry} onChange={this.props.Change} required>
              <option>Select Industry Type</option>
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
              <div class="col-md-3 mb-3">
              <p class="font-weight-bold smally">Application Type</p>
              <select class="form-control widthdropdown smally" id="exampleFormControlSelect1" name="EasyApply" value={this.props.EasyApply} onChange={this.props.Change} required>
              <option>Easy Apply</option>
              <option>1</option>
              <option>0</option>
				      </select>
                    </div>
                    </div>
                    <div class="row">
                        <div class="mb-4">
                        <p class="font-weight-bold smally">Job Description</p>
                        <textarea type="textarea" class="form-control form-control-lg font-weight-bold smally textareawidth" name="JobDescription" placeholder="" value={this.props.JobDescription} onChange={this.props.Change} required/>
                        <div class="invalid-feedback">
                        </div>
                        <br />
                        <p class="font-weight-bold smally">Recommended Mail</p>
                        <input className="form-control form-control-sm smally" type="email" name="RecommendedMail" placeholder="Email Address" value={this.props.RecommendedMail} onChange={this.props.Change} required></input>
                        <br />
                        <p class="font-weight-bold smally">Location</p>
                        <input className="form-control form-control-sm smally" type="text" name="Location" placeholder="City" value={this.props.Location} onChange={this.props.Change} required></input>
                        <br />
                        <p class="font-weight-bold smally">ZipCode</p>
                        <input className="form-control form-control-sm smally" type="text" name="ZipCode" placeholder="ZIP" value={this.props.ZipCode} onChange={this.props.Change} required></input>
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
