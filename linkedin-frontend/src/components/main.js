import React, {Component} from 'react';
import {Switch,Route, Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.js';
import JobListing from './job_listings/joblisting.js';
import JobPostings from './JobPostings/JobPostings'
import CustomJobApply from './JobApply/customApply.js';
import EasyJobApply from './JobApply/easyApplyModal.js';
import Jobs from './JobApply/jobs.js';
import JobsApplied from './JobApply/jobsApplied.js';
import Login from './applicant/login'
import UserProfile from './applicant/userprofile'
import UserProfileFirst from './applicant/profilefirst'
import {history} from './../util/utils';
import Navbar from "./navbar/Navbar";
import ApplicantDashBoard from './applicant/applicantDashBoard';
import DeleteAccount from './applicant/deleteapplicantaccount';
import UserSearch from './applicant/usersearch';
import ResumeView from './applicant/resumeview';
import ApplicantHome from "./feed/applicantHome.js";
import Resumes from "./JobApply/resumes.js";
import Messages from './messages/messages.js';
class Main extends Component {
    render(){
        return(
            <Provider store={store}>
            <Router history={history}>
            <Switch>
                <Route exact path="/listings" component={JobListing} />
                <Route exact path="/postjob" component={JobPostings} />
                <Route exact path="/customapply" component={CustomJobApply} />
                <Route exact path="/" component={Login} />
                <Route exact path="/easyapply" component={EasyJobApply} />
                <Route exact path="/jobs" component={Jobs} />
                <Route exact path="/jobs/applied" component={JobsApplied} />
                <Route exact path="/navbar" component={Navbar} />
                <Route exact path="/profilefirst" component={UserProfileFirst} />
                <Route exact path="/userprofile" component={UserProfile} />
                <Route exact path="/deleteapplicantaccount" component={DeleteAccount}/>
                <Route exact path="/applicantDashBoard" component={ApplicantDashBoard}/>
                <Route exact path="/usersearch" component={UserSearch}/>
                <Route exact path="/resumeview" component={ResumeView}/>
                <Route exact path="/feed" component={ApplicantHome} />
                <Route exact path="/recruiter/dashboard" component={RecruiterDashboard} />
                <Route exact path="/messages" component={Messages} />
                <Route exact path="/resumes/:filename" component={Resumes} />
            </Switch>
            </Router>
            </Provider>
    );
  }
}
export default Main;
