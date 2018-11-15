import React,{Component} from 'react';
import './JobBudget.css';
import Slider from 'react-rangeslider';
 import 'react-rangeslider/lib/index.css'
  import {Redirect} from 'react-router-dom';
  import { Container, Row, Col, Button, Fa, Card, CardBody, Dropdown, DropdownToggle, DropdownItem, DropdownMenu, ModalFooter } from 'mdbreact';

class JobBudget extends Component {

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
                      <p class="font-weight-bold ">Step 3: Set your budget, pay when candidates view your job</p>
                      <br />
                      <br />
                        <form>
                        <p class="font-weight-bold smally">Budget in $</p>
                        <div className='slider'>
                        <Slider
                        name="Test"
                            min={15}
                            max={300}
                            value={this.props.Budget}
                            onChange = {this.props.SliderChangeBudget} 
                        />
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

export default JobBudget;