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

import Peopleevent from "./eventpeople";
class Restaurantevents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: cookie.load("user"),
      Events: [],
      dispEvents: [],
      term: "",
    };
  }
  componentDidMount() {
    console.log(this.state.user);
    const data = {
      username: this.state.user,
    };
    axios
      .get("http://localhost:3001/restaurantevents")

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          Events: response.data,
          dispEvents: response.data,
        });
      });
  }

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
            <Peopleevent
              UserEmail={cookie.load("user")}
              RestEmail={eve.RestaurantEmail}
              eventname={eve.EventName}
            />
          </Card>
        </React.Fragment>
      );
    });

    return (
      <Container>
        <h1>Events Page</h1>
        {eventsdisp}
        <h1>Events Page</h1>
        <Setups></Setups>
      </Container>
    );
  }
}
export default Restaurantevents;
