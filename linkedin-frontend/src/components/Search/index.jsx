import React, { Component } from "react";
import Navbar from "../navbar/Navbar";
import axios from "axios";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      users: ""
    };
  }
  componentWillMount() {
    console.log("inside cwm");
    axios
      .post("http://localhost:3001/search/users")
      .then(res => {
        console.log("response from backend", res);
        this.setState({ users: res });
      })
      .catch(err => {
        console.log(err.response);
      });
  }
  render() {
    return (
      <React.Fragment>
        <Navbar />
      </React.Fragment>
    );
  }
}

export default Search;
