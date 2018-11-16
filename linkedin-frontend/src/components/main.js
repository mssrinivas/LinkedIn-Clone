import React, {Component} from 'react';
import {Switch,Route, Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.js';
import JobListing from './job_listings/joblisting.js';
import JobPostings from './JobPostings/JobPostings'
<<<<<<< HEAD
import CustomJobApply from './JobApply/customApply.js';
=======
import Login from './applicant/login'
import {history} from './../util/utils';
>>>>>>> 7f7091c7ca041d9a8afff6291e0be2af8b28756f

class Main extends Component {
    render(){
        return(
            <Provider store={store}>
            <Router history={history}>
            <Switch>
                <Route exact path="/listings" component={JobListing} />
                <Route exact path="/postjob" component={JobPostings} />
<<<<<<< HEAD
                <Route exact path="/customapply" component={CustomJobApply} />
=======
                <Route exact path="/" component={Login} />
>>>>>>> 7f7091c7ca041d9a8afff6291e0be2af8b28756f
            </Switch>
            </Router>
            </Provider>

        )
    }
}
export default Main;
