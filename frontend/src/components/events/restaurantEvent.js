import React, { Component } from "react";
import "../../App.css";
import { Container, Card } from "react-bootstrap";
import cookie from "react-cookies";
import axios from "axios";
import Setups from "./eventSetup";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import { backendURL } from "../../config";
import Peopleevent from "./eventPeople";
class Restaurantevents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: cookie.load("user"),
      dispEvents: [],
      term: "",
    };
  }
  componentDidMount() {
    console.log(this.state.user);

    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .get(backendURL + "/customer/profile", {
        params: {
          restaurantID: this.state.ID,
        },
        withCredentials: true,
      })
      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          dispEvents: response.data,
        });
      });
  }

  render() {
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
