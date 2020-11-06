import React, { Component } from "react";

import axios from "axios";
import cookie from "react-cookies";

import "bootstrap/dist/css/bootstrap.min.css";

import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import MapContainer from "./RestaurantSearch";
import { backendURL } from "../../config";
import {
  Container,
  Jumbotron,
  Form,
  Button,
  FormControl,
  ListGroup,
} from "react-bootstrap";
class userSearchTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locat: null,
      restaurants: [],
      searchcolumn: "",
      searchterm: "",
    };
    this.updateterm = this.updateterm.bind(this);
    this.updatecat = this.updatecat.bind(this);
    this.handleupsearch = this.handleupsearch.bind(this);
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords);
      const locat = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.setState({ locat });
    });
    const data = {
      searchcolumn: this.state.searchcolumn,
      searchterm: this.state.searchterm,
    };
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .post(backendURL+"/restaurants", data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          restaurants: response.data,
          loaded: true,
        });
      });
  }
  updateterm = (e) => {
    this.setState({
      searchterm: e.target.value,
    });
  };
  updatecat = (e) => {
    this.setState({
      searchcolumn: e.target.value,
    });
  };
  handleupsearch = () => {
    var data = {
      searchterm: this.state.searchterm,
      searchcolumn: this.state.searchcolumn,
    };
    axios
      .post(backendURL+"/restaurantsearch", data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          restaurants: response.data,
          loaded: true,
        });
      });
  };

  render() {
    //iterate over books to create a table row

    //if not logged in go to login page
    console.log(this.state.restaurants);
    var eventsdisp = null;
    eventsdisp = this.state.restaurants.map((eve) => {
      console.log(eve.RestaurantEmail);
      return (
        <>
          <ListGroup.Item>
            <Link
              to={{
                pathname: "/restaurant",
                state: { foo: eve.RestaurantEmail },
              }}
            >
              {eve.RestaurantName}
            </Link>
          </ListGroup.Item>
        </>
      );
    });
    if (cookie.load("customer")) {
      return (
        <Container>
          <Jumbotron>
            <Form inline justify-content-center>
              <center>
                <h2>Restaurant Search Bar</h2>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                  onChange={this.updateterm}
                />
                <Form.Control as="select" required onChange={this.updatecat}>
                  <option value="cuisines">Cusine</option>
                  <option value="location">Location</option>
                  <option value="mode of delivery">Mode of Delivery</option>
                  <option value="DishName">Dish</option>
                </Form.Control>
                <Button onClick={this.handleupsearch} variant="outline-success">
                  Search
                </Button>
              </center>
            </Form>
          </Jumbotron>
          <h1> Restaurants Near Me</h1>
          <ListGroup>{eventsdisp}</ListGroup>
          <MapContainer
            location={this.state.locat}
            rest={this.state.restaurants}
          />
        </Container>
      );
    }  else {
      return <Redirect to="/login" />;
    }
  }
}

//export Home Component
export default userSearchTab;
