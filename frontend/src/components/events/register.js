import React, { Component } from "react";
import "../../App.css";

import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class Regevent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserEmail: props.UserEmail,
      RestEmail: props.RestEmail,
      EventName: props.eventName,
      Registered: false,
    };
    console.log(this.state);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    console.log(this.state.user);
    const data = {
      UserEmail: this.state.UserEmail,
      RestEmail: this.state.RestEmail,
      EventName: this.state.EventName,
    };
    axios
      .post("http://localhost:3001/register", data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        console.log("Status Code : ", response.status);
        if (response.status === 201) {
          this.setState({
            Registered: true,
          });
        } else {
          this.setState({
            Registered: false,
          });
        }
      });
  }

  handleClick = (e) => {
    const data = {
      UserEmail: this.state.UserEmail,
      RestEmail: this.state.RestEmail,
      EventName: this.state.EventName,
    };
    axios
      .post("http://localhost:3001/registered", data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            Registered: true,
          });
        } else {
          this.setState({
            Registered: false,
          });
        }
      });
  };

  render() {
    let reg = null;
    if (this.state.Registered) {
      console.log("yolo");

      reg = (
        <Button disabled size="sm">
          Registered!
        </Button>
      );
    } else {
      reg = (
        <Button onClick={this.handleClick} size="sm">
          Register
        </Button>
      );
    }

    return (
      <>
        <Container>{reg}</Container>
      </>
    );
  }
}
export default Regevent;
