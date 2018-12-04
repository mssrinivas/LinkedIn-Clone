import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().toDate()
    };
  }

  handleDateChange = date => {
    this.setState({
      date: date
    });
  };

  render() {
    return (
      <React.Fragment>
        <nav
          style={{
            height: 55,
            "box-shadow": "0 0 0 0 rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2)"
          }}
        >
          <span style={{ padding: 10 }}>Filters: </span>
          <div style={{ display: "inline-block", padding: 10 }}>
            <input
              onChange={this.filterByLocation}
              style={{
                height: 34,
                width: 300,
                marginBottom: 20
              }}
              role="combobox"
              autocomplete="off"
              spellcheck="false"
              aria-autocomplete="list"
              aria-owns="nav-search-artdeco-typeahead-results"
              aria-expanded="false"
              placeholder="Location"
              type="text"
            />
          </div>
          <div style={{ display: "inline-block", padding: 10 }}>
            <div className="form-group form-control">
              <DatePicker
                selected={this.state.date}
                onChange={this.handleDateChange}
              />
            </div>
          </div>
          <button
            id="login-btn"
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Seniority Level
          </button>
          <div
            className="dropdown-menu"
            data-toggle="dropdown"
            aria-labelledby="dropdownMenuButton"
          >
            <input type="button" className="dropdown-item" value="Internship" />
            <input type="button" className="dropdown-item" value="Mid Level" />
            <input
              type="button"
              className="dropdown-item"
              value="Senior Level"
            />
            <input type="button" className="dropdown-item" value="Director" />
          </div>
          <div style={{ display: "inline-block", padding: 10 }}>
            <button
              onClick={this.addToCart}
              className="btn btn-secondary rounded-0"
            >
              Search
            </button>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default SearchBar;
