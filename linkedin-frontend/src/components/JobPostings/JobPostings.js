import React,{Component} from 'react';
import './JobPostings.css';
import {Redirect} from 'react-router-dom';
import JobDescription from './JobDescription'
import JobQualifications from './JobQualifications';
import JobBudget from './JobBudget';
import Navigation from './Navigation';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from 'react-stepper-horizontal';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import { Container, Button, Row, Col, Step, Input } from 'mdbreact';
import {connect} from 'react-redux';
//import validatePinCode from '../../util/validation.js';
import * as VALIDATION from './../../util/validation';
var swal = require('sweetalert')
class JobPostings extends Component {
   constructor(props) {
      super(props);
      this.state = {
        Company :"",
        JobTitle : "",
        Location : "",
        JobFunction : "",
        Industry : [],
        JobDescription : "",
        RecommendedMail : "",
        SeniorityLevel : "",
        Info : "",
        Skills : [],
        Experience : 0,
        ZipCode: null,
        Degree : [],
        Budget : 0,
        EmploymentType : "",
        RecruiterName : "",
        PostingDate : "",
        EasyApply : null,
        RedirecttoDescription: true,
        RedirecttoQualification: false,
        RedirecttoBudget : false,
        Redirection_Value : false,
        formActivePanel3: 1,
        formActivePanel3Changed: false,
        State: "",
           steps: [{
        title: 'Step One',
        href: 'http://example1.com',
        onClick: (e) => {
          e.preventDefault()
          this.setState({RedirecttoDescription : true })
          this.setState({RedirecttoQualification : false})
          this.setState({RedirecttoBudget : false })
          console.log('onClick', 1)
        }
      }, {
        title: 'Step Two',
        href: 'http://example2.com',
        onClick: (e) => {
          e.preventDefault()
          this.setState({RedirecttoDescription : false })
          this.setState({RedirecttoQualification : true})
          this.setState({RedirecttoBudget : false })
          console.log('onClick', 2)
        }
      }, {
        title: 'Step Three',
        href: 'http://example3.com',
        onClick: (e) => {
          e.preventDefault()
          this.setState({RedirecttoDescription : false})
          this.setState({RedirecttoQualification : false})
          this.setState({RedirecttoBudget : true })
          console.log('onClick', 3)
        }
      }],
      currentStep: 0
      }
      this.onClickNext = this.onClickNext.bind(this);
      this.onClickBack = this.onClickBack.bind(this);
      this.inputHandler = this.inputHandler.bind(this);
  }

  onClickNext() {
    const { steps, currentStep } = this.state;
   if(this.state.currentStep == 0 || this.state.currentStep == 1 || this.state.currentStep == 2 )
   if(this.state.currentStep === 0)
   {
    this.setState({
        currentStep: currentStep + 1,
      });
      this.setState({RedirecttoDescription : false })
      this.setState({RedirecttoQualification : true})
      this.setState({RedirecttoBudget : false })
   }
   if(this.state.currentStep === 1)
    {
        this.setState({
            currentStep: currentStep + 1,
          });
          this.setState({RedirecttoDescription : false })
          this.setState({RedirecttoQualification : false})
          this.setState({RedirecttoBudget : true })
    }
    console.log(this.state.currentStep)
  }

  onClickBack() {
    const { steps, currentStep } = this.state;
    if(this.state.currentStep <= 3)
    this.setState({
        currentStep: currentStep - 1,
    });

    console.log(this.state.currentStep)
    if(this.state.currentStep === 1)
    {
          this.setState({RedirecttoDescription : true })
          this.setState({RedirecttoQualification : false})
          this.setState({RedirecttoBudget : false })

    }
    if(this.state.currentStep === 2)
    {
        this.setState({RedirecttoDescription : false })
        this.setState({RedirecttoQualification : true})
        this.setState({RedirecttoBudget : false })
    }

    if(this.state.currentStep === 3)
    {
        this.setState({RedirecttoDescription : false })
        this.setState({RedirecttoQualification : false})
        this.setState({RedirecttoBudget : true })
    }
  }

inputHandler = (event) => {
  console.log("Here")
    console.log(event.target.value)
    this.setState({[event.target.name] : event.target.value})
    console.log("State is ", this.state.RecommendedMail)
  }

SliderChangeExperience = (value) => {
    this.setState({
        Experience: value
      })
    };

SliderChangeBudget = (value) => {
        this.setState({
            Budget: value
        })
    };

  componentDidMount() {
  }

  onSave(totalTime){
    console.log("TOTAL-TIME IS", totalTime)
  }

  onSubmitClicked = () => {
    if(this.state.EasyApply === '1')
    {
        this.setState({EasyApply : 1})
    }
    if(VALIDATION.validatePinCode(this.state.ZipCode) === true)
    {
    var url = 'http://localhost:3001/postjob'
    fetch(url, {
      method: 'post',
      credentials : 'include',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        Company: this.state.Company,
        JobTitle: this.state.JobTitle,
        Location: this.state.Location,
        JobFunction : this.state.JobFunction,
        JobDescription : this.state.JobDescription,
        RecommendedMail : this.state.RecommendedMail,
        SeniorityLevel: this.state.SeniorityLevel,
        Experience : this.state.Experience,
        Degree :  this.state.Degree,
        Budget : this.state.Budget,
        EmploymentType : this.state.EmploymentType,
        RecruiterName: this.props.currentUserDetails.first_name+" "+this.props.currentUserDetails.last_name,
        EasyApply: this.state.EasyApply,
        Industry : this.state.Industry,
        State: this.state.State,
        ZipCode: this.state.ZipCode
       })
    })
    .then(response => response.json())
    .then(poststatus => {
      console.log(poststatus)
      if(poststatus === "Applied successfully")
      {
        swal("Job Posted successfully!", " ", "success");
      }
      else
      {
        swal("Job couldn't be posted due to errors!"," ", "failure");
      }

  })
    }
  }

  render ()
  {
    let Redirecty = null;
    if(this.state.RedirecttoDescription === true)
    {
        Redirecty = (<JobDescription
        Company = {this.state.Company}
        JobTitle = {this.state.JobTitle}
        Location = {this.state.Location}
        JobFunction  = {this.state.JobFunction}
        Industry = {this.state.Industry}
        EmploymentType = {this.state.EmploymentType}
        JobDescription = {this.state.JobDescription}
        RecommendedMail = {this.state.RecommendedMail}
        SeniorityLevel = {this.state.SeniorityLevel}
        Info = {this.state.Info}
        Change = {this.inputHandler}
        EasyApply = {this.state.EasyApply}
        State = {this.state.State}
        ZipCode = {this.state.ZipCode}
        />)
    }

    if(this.state.RedirecttoQualification === true)
    {
      Redirecty = (<JobQualifications
        Skills = {this.state.Skills}
        Experience = {this.state.Experience}
        Degree = {this.state.Degree}
        Change = {this.inputHandler}
        SliderChangeExperience = {this.SliderChangeExperience}
        descriptionstarttime  = {this.state.descriptionstarttime}
        />)
    }

     if(this.state.RedirecttoBudget === true)
    {
        // Redirecty = (<JobBudget
        // Budget = {this.state.Budget}
        // Change = {this.inputHandler}
        // SliderChangeBudget = {this.SliderChangeBudget}
        // />)
        Redirecty =  <JobBudget
          Budget = {this.state.Budget}
          Change = {this.inputHandler}
          SliderChangeBudget = {this.SliderChangeBudget}
          />

    }
    const { steps, currentStep } = this.state;
    const buttonStyle = { width: 200, padding: 16, textAlign: 'center', margin: '0 auto', marginTop: 32 };
    return (
            <div>
            {<Navigation />}
            <Stepper steps={ steps } activeStep={ currentStep }/>
            <div class ="addtexttocenter">
            </div>
            {Redirecty}
            <div style={ buttonStyle } >
            <button type="button" class="btn btn-primary linkedincolor changewidthbutton" onClick={this.onClickNext}>Proceed</button>
            &nbsp;<button type="button" class="btn btn-primary linkedincolor changewidthbutton" onClick={this.onSubmitClicked}>Submit</button>
            </div>
            </div>
         );
    }
}

function mapStateToProps(state) {
  console.log("State",state);
    return {
       currentUser: state.LoginReducer.current_user,
       currentUserDetails: state.LoginReducer.currentUserDetails,
       userProfileDetails: state.LoginReducer.userProfileDetails
    };
}


export default connect(mapStateToProps)(JobPostings);
