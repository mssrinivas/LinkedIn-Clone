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
            </Switch>
            </Router>
            </Provider>


    );
  }
}
export default Main;
