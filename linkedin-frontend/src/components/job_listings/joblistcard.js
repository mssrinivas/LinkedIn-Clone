import React, { Component } from 'react';
class JobListCard extends Component {
    
    constructor(props){
        super(props);
    
    }

    cardClicked = (e)=>{
        this.props.onCardClicked(this.props.position);
    }

    render() { 
        
        const {data} = this.props;

        return ( 
            <div className="row joblist-row justify-content-center" onClick={this.cardClicked} >
                <div className="col-md-2">
                    <img className="w-100 contain" id="logo-company-img" src={data.companyLogo} alt={data.companyname} />
                </div>
                <div className="col-md-8">
                    <p className="position-name" style={{color:'#0073b1',fontSize:'16px'}}> {data.jobTitle} {data.jobFunction} </p>
                    <p className="company-name" style={{fontSize:'14px',color:'black'}} > {data.companyName} </p>
                    <p className="location" style={{fontSize:'13px',color:'grey',fontStyle:'bold'}} > {data.location} </p>
                    <p className="description" style={{fontSize:'14px'}} > {data.description.substring(0, data.description.length>100?100:data.description.length)}... </p>
                    <p className="apply" style={{fontSize:'12px',color:'grey'}} ><b>Posted On: {new Date(data.postingDate).toDateString()}</b></p>
                    <div style={{display:data.easyApply?'block':'none'}}>
                        <p className="apply" style={{fontSize:'12px',color:'grey'}} ><img src="https://img.icons8.com/color/100/5e6d77/linkedin.png" height="20px" width="20px"/><b>Easy Apply</b></p>
		            </div>
                </div>
            </div>
         );
    }
}
 
export default JobListCard;