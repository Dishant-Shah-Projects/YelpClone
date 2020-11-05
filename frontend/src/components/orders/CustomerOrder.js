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

import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import Order from "./order";
// Orders page for users
class UserOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: cookie.load("user"),
      Orders: [],
      dispOrders: [],
      term: "",
      term2: "",
    };

    this.handleupsearch = this.handleupsearch.bind(this);
    this.updateterm = this.updateterm.bind(this);
  }
  componentDidMount() {
    console.log(this.state.user);
    const data = {
      useremail: this.state.user,
    };
    axios
      .post("http://localhost:3001/userorders", data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          Orders: response.data,
          dispOrders: response.data,
        });
      });
  }
  updateterm = (e) => {
    this.setState({
      term: e.target.value,
    });
  };
  updateterm2 = (e) => {
    this.setState({
      term2: e.target.value,
    });
  };
  handleupsearch2 = (e) => {
    var output = this.state.Orders.filter(
      (order) => order.OrderStatus == this.state.term2
    );
    console.log(this.state.term2);
    console.log(output);
    this.setState({
      dispOrders: output,
    });
  };
  updateterm = (e) => {
    this.setState({
      term: e.target.value,
    });
  };

  handleupsearch = (e) => {
    var output = this.state.Orders.filter(
      (order) => order.OrderType == this.state.term
    );

    this.setState({
      dispOrders: output,
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


    let eventsdisp = null;
    eventsdisp = this.state.dispOrders.map((eve) => {
      console.log(eve.RestaurantEmail);
      return (
        <React.Fragment>
          <Card>
            <Card.Title>Restaurant Name: {eve.RestaurantName}</Card.Title>
            <Card.Body>
              <a>Order Status: {eve.OrderStatus}</a>
              <br />
              <a>Order Time: {eve.OrderTime}</a>
            </Card.Body>

            <Order Orderinfo={eve} />
          </Card>
        </React.Fragment>
      );
    });

    return (
      <Container>
        <h1>Orders</h1>
        <Row>
          <Col>
            <Form inline>
              <Form.Label>Order Type</Form.Label>
              <Form.Control as="select" required onChange={this.updateterm}>
                <option value="Delivery">delivery</option>
                <option value="Pickup">pickup</option>
              </Form.Control>
              <Button
                onClick={this.handleupsearch}
                variant="outline-success"
                onClick={this.handleupsearch}
              >
                Search
              </Button>
            </Form>
          </Col>
          <Col>
            <Form inline>
              <Form.Label>Order Status</Form.Label>
              <Form.Control as="select" required onChange={this.updateterm2}>
                <option value="Order Received">Recieved</option>
                <option value="Preparing">Preparing</option>
                <option value="On The Way">OnTheWay</option>
                <option value="Delivered">Delivered</option>
                <option value="Pick Up ready">Ready for Pickup</option>
                <option value="Picked Up">Picked Up</option>
              </Form.Control>
              <Button onClick={this.handleupsearch2} variant="outline-success">
                Search
              </Button>
            </Form>
          </Col>
        </Row>

        {eventsdisp}
      </Container>
    );
  }
}
export default UserOrders;
