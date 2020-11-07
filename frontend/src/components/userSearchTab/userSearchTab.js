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
      CustomerID:localStorage.getItem("userId"),
      restaurants: [],
      searchcolumn: "",
      searchterm: "",
      PageNo:0,
    };
    this.updateterm = this.updateterm.bind(this);
    this.updatecat = this.updatecat.bind(this);
    this.handleupsearch = this.handleupsearch.bind(this);
  }
  componentDidMount() {

    const data = {
      CustomerID:this.state.CustomerID,
      term: this.state.searchcolumn,
      value: this.state.searchterm,
      PageNo:this.state.PageNo,
    };
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .post(backendURL+"/customer/customerSearch", data)
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
    this.setState({
      PageNo:0,
    });
    const data = {
      CustomerID:this.state.CustomerID,
      term: this.state.searchcolumn,
      value: this.state.searchterm,
      PageNo:this.state.PageNo,
    };
    axios
      .post(backendURL+"/customer/customerSearch", data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          restaurants: response.data,
          loaded: true,
        });
      });
  };
  handleupsearch2 = () => {
    this.setState({
      searchterm:'Following',
      PageNo:0,
    });
    const data = {
      CustomerID:this.state.CustomerID,
      term: this.state.searchcolumn,
      value: this.state.searchterm,
      PageNo:this.state.PageNo,
    };
    axios
      .post(backendURL+"/customer/customerSearch", data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          restaurants: response.data,
          loaded: true,
        });
      });
  };
  handleupsearch3 = () => {
    this.setState({
      searchterm:'location',
      PageNo:0,
    });
    const data = {
      CustomerID:this.state.CustomerID,
      term: this.state.searchcolumn,
      value: this.state.searchterm,
      PageNo:this.state.PageNo,
    };
    axios
      .post(backendURL+"/customer/customerSearch", data)

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
      if(eve.FirstName){
        return (
          <>
            <ListGroup.Item>
              <Link
                to={{
                  pathname: "/user",
                  state: { foo: eve.customerID },
                }}
              >
                {eve.FirstName} {eve.LastName}
              </Link>
            </ListGroup.Item>
          </>
        );
      }
      else{
      return (
        <>
          <ListGroup.Item>
            <Link
              to={{
                pathname: "/user",
                state: { foo: eve.customerID },
              }}
            >
              {eve.CustomerName}
            </Link>
          </ListGroup.Item>
        </>
      );
            }
    });
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
                  <option value="FirstName">FirstName</option>
                  <option value="Nickname">Nickname</option>
                  <option value="mode of Following">Following</option>
                  <option value="location">location</option>
                </Form.Control>
                <Button onClick={this.handleupsearch} variant="outline-success">
                  Search
                </Button>
              </center>
            </Form>
            <Button onClick={this.handleupsearch2} variant="outline-success">
                  following
                </Button>
                <Button onClick={this.handleupsearch3} variant="outline-success">
                  locaton
                </Button>
          </Jumbotron>
          <h1> Restaurants Near Me</h1>
          <ListGroup>{eventsdisp}</ListGroup>
        </Container>
      );
  }
}

//export Home Component
export default userSearchTab;
