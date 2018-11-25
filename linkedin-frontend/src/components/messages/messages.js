import React, { Component } from 'react';
import Navbar from './../navbar/Navbar.jsx';
import ConnectionCard from './ConnectionCard/ConnectionCard.js';
import ChatCard from './ChatCard/ChatCard.js';


class Messages extends Component {
    
    constructor(props){
        super(props)
        
    }

    render() { 
        return ( 
            <div>
                <Navbar />
                
                <div className="row" style={{margin:'30px 10px 10px 30px',border:'1px solid #cdcfd2'}}>
                    <div className="col-md-5" style={{border:'1px solid #cdcfd2',height:'500px',overflowY:'scroll'}} >
                        
                    <div style={{borderBottom:'1px solid #cdcfd2',height:'50px',padding:'0px'}}>
                            <p className="clearfix" style={{fontSize:'20px',fontWeight:'bold',verticalAlign:'center'}}>Messaging</p>
                    </div>

                    <div style={{borderBottom:'1px solid #cdcfd2',height:'40px'}}>
                            <img src="https://img.icons8.com/material-outlined/100/7a7a7a/search.png" alt="" height="25px" width="25px"/>
                            <input type="text" name="search" id="search-bar" placeholder="Search messages" style={{width:'90%',height:'100%',border:'none',background:'white'}} />
                    </div>
                        <ConnectionCard />
                        <ConnectionCard />
                        <ConnectionCard />
                        <ConnectionCard />
                        <ConnectionCard />
                        <ConnectionCard />
                        <ConnectionCard />
                        <ConnectionCard />
                        <ConnectionCard />
                        
                    </div>
                    <div className="col-md-7" style={{border:'1px solid #cdcfd2',height:'500px'}}>
                    
                    <div style={{borderBottom:'1px solid #cdcfd2',height:'50px',padding:'0px',margin:'0px'}}>
                            <p className="clearfix" style={{fontSize:'18px',fontWeight:'bold',verticalAlign:'center'}}>Arihant Sai</p>
                            <p className="clearfix" style={{fontSize:'14px',fontWeight:'italic',verticalAlign:'center'}}>R&amp;D Engineer at Samsung</p>
                    </div>

                    <div style={{bottom:'122px',top:'50px',width:'95%',marginTop:'2px',padding:'0px 2px 0px 2px',margin:'0px',position:'absolute',overflowY:'scroll'}}>
                        
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        
                    </div>
                    

                    

                   <div style={{width:'95%',bottom:'42px',height:'80px' ,padding:'0px',position:'absolute'}}>
                        <textarea placeholder="Write something" style={{height:'100%',width:'100%'}}></textarea> 
                    </div>
                    
                    <div style={{width:'95%',bottom:0,height:'40px' ,padding:'0px',position:'absolute'}}>
                        <button type="button" style={{width:'100%',height:'100%',background:'#006097',color:'white',borderRadius:'5px'}}>Send</button> 
                    </div>

                    </div>
                </div>
            </div>
                

         );
    }
}
 
export default Messages;