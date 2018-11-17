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
            <div className="row joblist-row" onClick={this.cardClicked}>
                <div className="col-md-2 justify-content-center">
                    <img className="w-100 contain" id="logo-company-img" src={data.companyLogo} alt={data.companyname} />
                </div>
                <div className="col-md-10">
                    <p className="position-name" style={{color:'#0073b1',fontSize:'16px'}}> {data.jobTitle} {data.jobFunction} </p>
                    <p className="company-name" style={{fontSize:'14px',color:'black'}} > {data.companyName} </p>
                    <p className="location" style={{fontSize:'13px',color:'grey',fontStyle:'bold'}} > {data.location} </p>
                    <p className="description" style={{fontSize:'14px'}} > {data.description.substring(0, data.description.length>100?100:data.description.length)}... </p>
                    <div>
                        <p className="apply" style={{fontSize:'12px',color:'grey'}} ><b>Posted On: {data.postingDate}</b> <img src="https://img.icons8.com/color/100/5e6d77/linkedin.png" height="15px" width="15px"/> Easy Apply</p>
		            </div>
                </div>
            </div>
         );
    }
}
 
export default JobListCard;