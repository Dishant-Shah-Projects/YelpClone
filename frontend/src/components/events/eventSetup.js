import React, { Component } from "react";
import "../../App.css";

import cookie from "react-cookies";
import { backendURL } from "../../config";
import axios from "axios";
import { Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class Setups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: localStorage.getItem("userId"),
      EventName: "",
      EventDescription: "",
      EventTime: "",
      EventDate: "",
      EventLocation: "",
      EventHastags: "",
      Redvar: false,
    };
    this.EventNameChangeHandler = this.EventNameChangeHandler.bind(this);
    this.EventDescriptionChangeHandler = this.EventDescriptionChangeHandler.bind(
      this
    );
    this.EventTimeChangeHandler = this.EventTimeChangeHandler.bind(this);
    this.EventDateChangeHandler = this.EventDateChangeHandler.bind(this);
    this.EventLocationChangeHandler = this.EventLocationChangeHandler.bind(
      this
    );
    this.EventHastagsChangeHandler = this.EventHastagsChangeHandler.bind(this);
    this.submit = this.submit.bind(this);
  }
  EventNameChangeHandler = (e) => {
    this.setState({
      EventName: e.target.value,
    });
  };
  EventDescriptionChangeHandler = (e) => {
    this.setState({
      EventDescription: e.target.value,
    });
  };
  EventTimeChangeHandler = (e) => {
    this.setState({
      EventTime: e.target.value,
    });
  };
  EventDateChangeHandler = (e) => {
    this.setState({
      EventDate: e.target.value,
    });
  };
  EventLocationChangeHandler = (e) => {
    this.setState({
      EventLocation: e.target.value,
    });
  };
  EventHastagsChangeHandler = (e) => {
    this.setState({
      EventHastags: e.target.value,
    });
  };

  componentWillMount() {
    this.setState({
      Redvar: false,
      EventName: "",
      EventDate: "",
    });
  }

  submit = (e) => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
      restaurantID: this.state.user,
      restaurantName: this.state.user,
      EventName: this.state.EventName,
      Description: this.state.EventDescription,
      Time: this.state.EventTime,
      Date: this.state.EventDate,
      Location: this.state.EventLocation,
      Hashtags: this.state.EventHastags,
    };

    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios.post(backendURL+"/restaurant/eventsPost", data).then((response) => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        this.setState({
          authFlag: true,
        });
      } else {
        this.setState({
          authFlag: false,
        });
      }
    });
  };
  render() {
    return (
      <Row>
        <Col md="auto">
          <Form>
            <div className="form-group">
              <label>Event Name</label>
              <input
                onChange={this.EventNameChangeHandler}
                type="text"
                className="form-control"
                id="EventName"
                aria-describedby="emailHelp"
                placeholder="Enter Even Name"
              />
            </div>
            <div className="form-group">
              <label>Event Time</label>
              <input
                onChange={this.EventTimeChangeHandler}
                type="time"
                className="form-control"
                id="EventTime"
                placeholder="Enter Event Time"
              />
            </div>
            <div className="form-group">
              <label>Event Date</label>
              <input
                onChange={this.EventDateChangeHandler}
                type="date"
                className="form-control"
                id="EventDate"
                placeholder="Enter Event Date"
              />
            </div>
            <div className="form-group">
              <label>Event LOcation</label>
              <input
                onChange={this.EventLocationChangeHandler}
                type="text"
                className="form-control"
                id="EventLocation"
                placeholder="Enter Event Location"
              />
            </div>
            <div className="form-group">
              <label>Event Hashtags</label>
              <input
                onChange={this.EventHastagsChangeHandler}
                type="text"
                className="form-control"
                id="EventHashtags"
                placeholder="Enter Event Hashtags"
              />
            </div>
            <div className="form-group">
              <label>Event Description</label>
              <input
                onChange={this.EventDescriptionChangeHandler}
                type="textarea"
                className="form-control"
                id="EventDescription"
                placeholder="Enter Event Description"
              />
            </div>

            <button
              type="submit"
              onClick={this.submit}
              className="btn btn-primary"
            >
              Submit
            </button>
          </Form>
        </Col>
      </Row>
    );
  }
}
export default Setups;
