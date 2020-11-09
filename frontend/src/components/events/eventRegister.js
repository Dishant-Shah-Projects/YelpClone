import React, { Component } from "react";
import "../../App.css";

import axios from "axios";
import { Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { backendURL } from "../../config";
class Regevent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserEmail: props.UserEmail,
      EventName: props.eventName,
      name: props.name,
      Registered: false,
    };
    console.log(this.state);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    console.log(this.state.user);
    var found = false;
    for (var i = 0; i < this.state.EventName.PeopleRegistered.length; i++) {
      if (
        this.state.EventName.PeopleRegistered[i].CustomerID ==
        this.state.UserEmail.ID
      ) {
        found = true;
        break;
      }
    }
    if (found) {
      this.setState({
        Registered: true,
      });
    }
  }

  handleClick = (e) => {
    const data = {
      eventID: this.state.EventName.eventID,
      CustomerID: this.state.UserEmail.ID,
      CustomerName: this.state.name,
    };
    axios
      .post(backendURL + "/customer/eventsregister", data)

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
    return false;
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
