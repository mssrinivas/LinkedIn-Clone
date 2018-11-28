import React, { Component } from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Main from './components/main.js';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
	      <Main />
      </BrowserRouter>
      
    );
  }
}


export default App;
