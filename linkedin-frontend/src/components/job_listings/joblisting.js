import React, { Component } from 'react';
import JobListCard from './joblistcard.js';
import JobDescription from './jobdescription.js';
import {Launcher} from 'react-chat-window'
class JobListing extends Component {
    constructor(props){
        super(props)
        this.state = {
            postings :[1,2,3,4,5,6],
            messageList: []
        };
        this.jobPostCardClicked = this.jobPostCardClicked.bind(this);
    }

    componentDidMount(){

    }

    jobPostCardClicked(position){
        console.log("card clicked at this :"+position);
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
                <Launcher
        agentProfile={{
          teamName: '<Recruiter Name>',
          imageUrl: "https://img.icons8.com/color/50/000000/linkedin.png"
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        messageList={this.state.messageList}
        showEmoji
      />
            </div>

         );
    }
}

export default JobListing;
