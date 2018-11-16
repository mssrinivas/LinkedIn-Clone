import React, {Component} from 'react';
import {Switch,Route, Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.js';
import JobListing from './job_listings/joblisting.js';
import JobPostings from './JobPostings/JobPostings'
import ListAllConnections from './connections/listallconnections';
import Login from './applicant/login'
import {history} from './../util/utils';


class Main extends Component {
    render(){
        return(
            <Provider store={store}>
            <Router history={history}>
            <Switch>
                <Route exact path="/listings" component={JobListing} />
                <Route exact path="/postjob" component={JobPostings} />
                <Route exact path="/listallconnections" component={ListAllConnections} />
                <Route exact path="/" component={Login} />
            </Switch>
            </Router>
            </Provider>

        )
    }
}
export default Main;
