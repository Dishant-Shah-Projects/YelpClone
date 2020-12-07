import React, { Component } from "react";

import axios from "axios";
import cookie from "react-cookies";

import "bootstrap/dist/css/bootstrap.min.css";

import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import MapContainer from "./RestaurantSearch";
import { backendURL } from "../../config";
import { connect } from "react-redux";
import { restaurantsearch } from "../../Redux/constants/actiontypes";
import {
  Container,
  Jumbotron,
  Form,
  Button,
  FormControl,
  ListGroup,
} from "react-bootstrap";
class RestaurantMaps extends Component {
  constructor(ownprops) {
    super(ownprops);
    this.state = {
      locat: null,
      restaurants: [ownprops.restaurants],
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
    if (this.state.restaurants === []) {
      const data = {
        term: this.state.searchcolumn,
        value: this.state.searchterm,
      };
      axios.defaults.headers.common["authorization"] = localStorage.getItem(
        "token"
      );
      axios
        .post(backendURL + "/customer/restaurantSearch", data)
        .then((response) => {
          //update the state with the response data
          console.log(response.data);
          this.props.restaurantsearch(response.data);
          this.setState({
            restaurants: response.data,
            loaded: true,
          });
        });
    }
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
      value: this.state.searchterm,
      term: this.state.searchcolumn,
    };
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .post(backendURL + "/customer/restaurantSearch", data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.props.restaurantsearch(response.data);
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
      return (
        <>
          <ListGroup.Item>
            <Link
              to={{
                pathname: "/restaurant",
                state: { foo: eve.restaurantID },
              }}
            >
              {eve.Name}
            </Link>
          </ListGroup.Item>
        </>
      );
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
  }
}

//export Home Component
//export Home Component
const mapStateToProps = (state, ownprops) => {
  console.log(state.LoginReducer.userInfo);
  const restaurants = state.restaurantSearchReducer.restaurants;
  return {
    restaurants: restaurants,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    restaurantsearch: (payload) => {
      dispatch({
        type: restaurantsearch,
        payload,
      });
    },
  };
};

//export Login Component
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantMaps);
