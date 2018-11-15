import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import { Provider } from 'react-redux'; 
//import store from './store/store.js';
import JobListing from './job_listings/joblisting.js';
import JobPostings from './JobPostings/JobPostings'

class Main extends Component {
    render(){
        return(
            
            <Switch>
                <Route exact path="/postings" component={JobListing} />
                <Route exact path="/postjob" component={JobPostings} />
            </Switch>
            
        )
    }
}
export default Main;
