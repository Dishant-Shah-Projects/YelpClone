import React, { Component } from "react";
import "../../App.css";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";
import Setups from "./setup";
import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import Regevent from "./register";
class Userevents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: cookie.load("user"),
      Events: [],
      dispEvents: [],
      term: "",
    };
    this.handleregiseter = this.handleregiseter.bind(this);
    this.handleupcoming = this.handleupcoming.bind(this);
    this.handleupsearch = this.handleupsearch.bind(this);
    this.updateterm = this.updateterm.bind(this);
  }
  componentDidMount() {
    console.log(this.state.user);
    const data = {
      username: this.state.user,
    };
    axios
      .get("http://localhost:3001/events")

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          Events: response.data,
          dispEvents: response.data,
        });
      });
  }
  updateterm = (e) => {
    this.setState({
      term: e.target.value,
    });
  };
  handleupcoming = (e) => {
    console.log(this.state.user);
    const data = {
      username: this.state.user,
    };
    axios
      .get("http://localhost:3001/userevents")

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          Events: response.data,
          dispEvents: response.data,
        });
      });
  };
  handleregiseter = (e) => {
    const data = {
      username: this.state.user,
    };
    console.log("yolo");
    axios
      .post("http://localhost:3001/eventsreg", data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          Events: response.data,
          dispEvents: response.data,
        });
      });
  };
  handleupsearch = (e) => {
    var data2 = {
      username: this.state.user,
      search: this.state.term,
    };
    console.log(data2);
    console.log("yolo");
    axios
      .post("http://localhost:3001/eventsup", data2)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          Events: response.data,
          dispEvents: response.data,
        });
      });
  };

  render() {
    let navLogin = null;
    let redirectVar = null;

    navLogin = (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to="/login">
            <span className="glyphicon glyphicon-log-in"></span> Login
          </Link>
        </li>
      </ul>
    );
    if (!cookie.load("user")) {
      console.log(cookie.load("user"));
      return (redirectVar = <Redirect to="/login" />);
    }
    console.log(this.state.Events);
    let eventsdisp = null;
    eventsdisp = this.state.dispEvents.map((eve) => {
      console.log(eve.RestaurantEmail);
      return (
        <React.Fragment>
          <Card>
            <Card.Title>{eve.EventName}</Card.Title>

            <a>{eve.EventDescription}</a>

            <a>{eve.EventLocation}</a>
            <a>{eve.EventTime}</a>
            <a>{eve.EventDate}</a>
            <a>{eve.EventHashtags}</a>
            <Regevent
              UserEmail={cookie.load("user")}
              RestEmail={eve.RestaurantEmail}
              eventName={eve.EventName}
            />
          </Card>
        </React.Fragment>
      );
    });

    return (
      <Container>
        <Row>
          <Col>
            <Button onClick={this.handleupcoming}>Upcoming Events</Button>
          </Col>
          <Col>
            <Button onClick={this.handleregiseter}>Registered</Button>
          </Col>

          <Col>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={this.updateterm}
              />
              <Button onClick={this.handleupsearch} variant="outline-success">
                Search
              </Button>
            </Form>
          </Col>
        </Row>
        <h1>Events Page</h1>
        {eventsdisp}
      </Container>
    );
  }
}
export default Userevents;
