import React, { Component } from 'react';
import JobListCard from './joblistcard.js';
import JobDescription from './jobdescription.js';

class JobListing extends Component {
    constructor(props){
        super(props)
        this.state = {
            postings :[1,2,3,4,5,6]
        };
        this.jobPostCardClicked = this.jobPostCardClicked.bind(this);
    }

    componentDidMount(){

    }

    jobPostCardClicked(position){
        console.log("card clicked at this :"+position);
    }
    
    render() { 
        const {postings} = this.state;
        return ( 
            <div>
                <div className="row">
                    <div className="col-md-4 postings-parent" style={{ borderRight: '1px solid #E0E0E0' }}>
                        {
                            postings.map((post, index) => {
                                return (<JobListCard onCardClicked={this.jobPostCardClicked} key={index} position={index} />);
                            })
                        }
                    </div>
                    <div className="col-md-8">
                        <JobDescription />
                    </div>
                </div>
            </div>
            
         );
    }
}
 
export default JobListing;