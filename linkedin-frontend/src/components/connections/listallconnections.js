import React, { Component } from 'react'

export default class listallconnections extends Component {
  render() {
    return (
      <div>
        <div class="card">
       
  <img  class="img-circle" src={ require('../../images/avatar.png')} alt="John" style={{width:"5%"}}/>
  <h1>John Doe</h1>
  <p class="title">CEO & Founder, Example</p>
  <p>Harvard University</p>
  <a href="#"><i class="fa fa-dribbble"></i></a> 
  <a href="#"><i class="fa fa-twitter"></i></a> 
  <a href="#"><i class="fa fa-linkedin"></i></a> 
  <a href="#"><i class="fa fa-facebook"></i></a> 
  <p><button>Contact</button></p>
</div>
      </div>
    )
  }
}
