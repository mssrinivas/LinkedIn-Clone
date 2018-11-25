import React, { Component } from 'react';
import JobListCard from './joblistcard.js';
import JobDescription from './jobdescription.js';
import {Launcher} from 'react-chat-window'
import axios from 'axios';
import Navbar from './../navbar/Navbar.jsx';
import {BASE_URL} from './../constants/constants.js';

class JobListing extends Component {
    constructor(props){
        super(props)
        this.state = {
            postings :[],
            messageList: [],
            selectedIndex : null,
            error : null
        };
        this.jobPostCardClicked = this.jobPostCardClicked.bind(this);
    }

    componentDidMount(){

        const url = BASE_URL+"/jobs/search";
        axios.get(url).then((response)=>{
            const {status} = response;
            if(status===200){
                console.log(response.data);
                this.setState({ postings : response.data.joblistings });
            }else{
                this.setState({error : response.data.msg});
            }
        });
    }

    saveJob(position){

    }

    applyJob(position){

    }

    jobPostCardClicked(position){
        this.setState({selectedIndex : position});
    }

    _onMessageWasSent(message) {
        this.setState({
          messageList: [...this.state.messageList, message]
        })
      }

      _sendMessage(text) {
        if (text.length > 0) {
          this.setState({
            messageList: [...this.state.messageList, {
              author: 'them',
              type: 'text',
              data: { text }
            }]
          })
        }
      }

    render() {

        const {postings,error,selectedIndex} = this.state;
        const isSelected = selectedIndex!=null;
        const joblistClassName = isSelected ? "col-md-4 postings-parent" : "col-md-12 postings-parent"
        const descriptionClassName = isSelected ?"col-md-8" : "col-md-0" ;
        const jobdescription= isSelected ? <JobDescription data={postings[selectedIndex]} position={selectedIndex} onSave={this.saveJob} onApply={this.applyJob} /> : null;
        const launcher = isSelected ? <Launcher agentProfile={{ teamName: postings[selectedIndex].recruiterName,imageUrl: postings[selectedIndex].companyLogo }} onMessageWasSent={this._onMessageWasSent.bind(this)} messageList={this.state.messageList} showEmoji /> : null;
        return (
            <div>
                <Navbar />
                <div className="row">
                    {error}
                    <div className={joblistClassName} style={{ borderRight: '1px solid #E0E0E0' }}>
                        {
                            postings.map((post, index) => {
                                return (<JobListCard data={post} onCardClicked={this.jobPostCardClicked} key={index} position={index} />);
                            })
                        }
                    </div>
                    <div className={descriptionClassName}>
                        {jobdescription}
                        {launcher}
                    </div>
                </div>

            </div>

         );
    }
}


export default JobListing;
