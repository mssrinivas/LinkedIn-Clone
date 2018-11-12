import React, { Component } from 'react';

class JobListCard extends Component {
    
    constructor(props){
        super(props);
    
    }

    cardClicked = (e)=>{
        this.props.onCardClicked(this.props.position);
    }

    render() { 
        return ( 
            <div className="row joblist-row" onClick={this.cardClicked}>
                <div className="col-md-2">
                    <img className="w-100 contain" src="https://img.icons8.com/color/200/5e6d77/linkedin.png" alt="LinkedIn" />
                </div>
                <div className="col-md-10">
                    <p className="position-name" style={{color:'#0073b1',fontSize:'16px'}}> Software Engineer Data Analytics </p>
                    <p className="company-name" style={{fontSize:'14px',color:'black'}} > LinkedIn </p>
                    <p className="location" style={{fontSize:'13px',color:'grey',fontStyle:'bold'}} > Palo Alto, California </p>
                    <p className="description" style={{fontSize:'14px'}} > Experience with Git, HBase, mysql. Profieciency in java expected. Work experience in about 3-5 yrs. </p>
                    <div>
                        <p className="apply" style={{fontSize:'12px',color:'grey'}} >2 weeks ago <img src="https://img.icons8.com/color/100/5e6d77/linkedin.png" height="15px" width="15px"/> Easy Apply</p>
		            </div>
                </div>
            </div>
         );
    }
}
 
export default JobListCard;