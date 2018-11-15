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
                    <div class="col-md-3 mb-3">
                    <Dropdown size="sm">
                    <DropdownToggle caret color="white">
                    <p class="font-weight-bold smally">Company</p>Google
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem><p class="font-weight-bold smally">Facebook</p></DropdownItem>
                        <DropdownItem><p class="font-weight-bold smally">LinkedIn</p></DropdownItem>
                        <DropdownItem><p class="font-weight-bold smally">Apple</p></DropdownItem>
                        <DropdownItem><p class="font-weight-bold smally">Twilio</p></DropdownItem>
                    </DropdownMenu>
                    </Dropdown>
                    </div>
                    <div class="col-md-3 mb-3">
                    <Dropdown size="sm">
                    <DropdownToggle caret color="white">
                    <p class="font-weight-bold smally">Job Title</p>Software Engineer
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem><p class="font-weight-bold smally">Software Designer</p></DropdownItem>
                        <DropdownItem><p class="font-weight-bold smally">Software Programmer</p></DropdownItem>
                        <DropdownItem><p class="font-weight-bold smally">Team Lead</p></DropdownItem>
                        <DropdownItem><p class="font-weight-bold smally">Cheif Executive Officer</p></DropdownItem>
                    </DropdownMenu>
                    </Dropdown>
                    </div>
                    <div class="col-md-3 mb-3">
                    <Dropdown size="sm">
                    <DropdownToggle caret color="white">
                    <p class="font-weight-bold smally">Location</p>San Jose
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem><p class="font-weight-bold smally">San Francisco</p></DropdownItem>
                        <DropdownItem><p class="font-weight-bold smally">New York</p></DropdownItem>
                        <DropdownItem><p class="font-weight-bold smally">Boston</p></DropdownItem>
                        <DropdownItem><p class="font-weight-bold smally">Texas</p></DropdownItem>
                        <DropdownItem><p class="font-weight-bold smally">Chicago</p></DropdownItem>
                    </DropdownMenu>
                    </Dropdown>
                    </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3 mb-3">
                      <Dropdown size="sm">
                    <DropdownToggle caret color="white">
                    <p class="font-weight-bold smally">Seniority Level</p>Entry Level
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem><p class="font-weight-bold smally">Internship</p></DropdownItem>
                        <DropdownItem><p class="font-weight-bold smally">Mid-Level</p></DropdownItem>
                        <DropdownItem><p class="font-weight-bold smally">Senior Level</p></DropdownItem>
                        <DropdownItem><p class="font-weight-bold smally">Director</p></DropdownItem>
                    </DropdownMenu>
                    </Dropdown>
                    </div>
                    </div>
                    <div class="row">
                    <div class="col-md-3 mb-3">
                    <Dropdown size="sm">
                    <DropdownToggle caret color="white">
                    <p class="font-weight-bold smally">Job Function</p>Software Developer
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem><p class="font-weight-bold smally">Quality Assurance</p></DropdownItem>
                        <DropdownItem><p class="font-weight-bold smally">Analyst</p></DropdownItem>
                        <DropdownItem><p class="font-weight-bold smally">Full Stack Developer</p></DropdownItem>
                        <DropdownItem><p class="font-weight-bold smally">Strategy/Planning</p></DropdownItem>
                    </DropdownMenu>
                    </Dropdown>
                    </div>
                    <div class="col-md-3 mb-3">
                    <Dropdown size="sm">
                    <DropdownToggle caret color="white">
                    <p class="font-weight-bold smally">Employment Type</p>Full Time
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem><p class="font-weight-bold smally">Full Time</p></DropdownItem>
                        <DropdownItem><p class="font-weight-bold smally">Part Time</p></DropdownItem>
                        <DropdownItem><p class="font-weight-bold smally">Internship</p></DropdownItem>
                        <DropdownItem><p class="font-weight-bold smally">Contractor</p></DropdownItem>
                        <DropdownItem><p class="font-weight-bold smally">Temporary</p></DropdownItem>
                        <DropdownItem><p class="font-weight-bold smally">Volunteer</p></DropdownItem>
                    </DropdownMenu>
                    </Dropdown>
                    </div>
                    <div class="col-md-3 mb-3">
                    <Dropdown size="sm">
                    <DropdownToggle caret color="white">
                    <p class="font-weight-bold smally">Industry Type</p>Information Technology
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem><p class="font-weight-bold smally">Information Technology</p></DropdownItem>
                        <DropdownItem><p class="font-weight-bold smally">Accounting</p></DropdownItem>
                        <DropdownItem><p class="font-weight-bold smally">Electronics</p></DropdownItem>
                        <DropdownItem><p class="font-weight-bold smally">Mechanical Industry</p></DropdownItem>
                        <DropdownItem><p class="font-weight-bold smally">Aviation</p></DropdownItem>
                        <DropdownItem><p class="font-weight-bold smally">Automotive</p></DropdownItem>
                        <DropdownItem><p class="font-weight-bold smally">Arts & Business</p></DropdownItem>
                        <DropdownItem><p class="font-weight-bold smally">Banking</p></DropdownItem>
                    </DropdownMenu>
                    </Dropdown>
                    </div>
                    </div>
                    <div class="row">
                        <div class="mb-3 centery">
                        <p class="font-weight-bold smally">Job Description</p>
                        <textarea type="textarea" class="form-control form-control-lg font-weight-bold smally" name="aboutme" placeholder=""  />
                        <div class="invalid-feedback">
                        </div>
                        <br />
                        <p class="font-weight-bold smally">Recommended Mail</p>
                        <input className="form-control form-control-sm" type="text" placeholder="Email Address"></input>
                    </div>
                    </div>
                    <Dropdown size="sm">
                    <DropdownToggle caret color="white">
                    <p class="font-weight-bold smally">How did you hear about us?</p>LinkedIn
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem><p class="font-weight-bold smally">Google</p></DropdownItem>
                        <DropdownItem><p class="font-weight-bold smally">Facebook</p></DropdownItem>
                        <DropdownItem><p class="font-weight-bold smally">Career Fairs</p></DropdownItem>
                        <DropdownItem><p class="font-weight-bold smally">Other Means</p></DropdownItem>
                    </DropdownMenu>
                    </Dropdown>
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
