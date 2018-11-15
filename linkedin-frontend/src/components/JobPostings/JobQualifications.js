import React,{Component} from 'react';
//import './PropertyDetails.css';
import Slider from 'react-rangeslider'
 // import 'semantic-ui-css/semantic.min.css';
 import './JobQualifications.css'
import {Redirect} from 'react-router-dom';
import { Container, Row, Col, Button, Fa, Card, CardBody, Dropdown, DropdownToggle, DropdownItem, DropdownMenu, ModalFooter } from 'mdbreact';
import 'react-rangeslider/lib/index.css'
class JobQualifications extends Component {

	 constructor(props) {
        super(props);  

    }
    
	render ()
	{
		return (
		<div class="padbot">
		<Container >
        <section className="form-elegant">
          <Row >
            <Col md="12" className="mx-auto shadowingcontainer">
              <Card>
                <CardBody className="mx-4">
				      <div class="form-group">
                      <p class="font-weight-bold ">Step 2: What are the right qualifications for your job?</p>
                      <br />
                      <br />
                      <p class="font-weight-bold smally">What range of relevant experience are you looking for? Minimum number of years required for your job?</p>
                      <form>
                          <div className='slider'>
                          <div class="modal-body">
                            <form>
                            <p class="font-weight-bold smally">Experience</p>
                            <div className='slider'>
                            <Slider
                            name="test"
                                min={0}
                                max={30}
                                value={this.props.Experience}
                                onChange = {this.props.SliderChangeExperience} 
                            />
                            </div>
                            <p class="font-weight-bold smally">What level of education are you looking for?</p>
                            <Dropdown size="sm">
                            <DropdownToggle caret color="white">
                            <p class="font-weight-bold smally">Degree</p>Bachelors
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem><p class="font-weight-bold smally">Masters</p></DropdownItem>
                                <DropdownItem><p class="font-weight-bold smally">Ph.D</p></DropdownItem>
                                <DropdownItem><p class="font-weight-bold smally">High School Diploma</p></DropdownItem>
                                <DropdownItem><p class="font-weight-bold smally">Associate's Degree</p></DropdownItem>
                            </DropdownMenu>
                            </Dropdown>
                            </form>
                        </div>
                         </div>
                    </form>
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

export default JobQualifications;