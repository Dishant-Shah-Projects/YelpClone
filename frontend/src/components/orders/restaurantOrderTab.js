import React, { Component } from "react";
import "../../App.css";
import { Container, Card, Row, Col, Button, Form } from "react-bootstrap";
import cookie from "react-cookies";
import axios from "axios";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import ROrder from "./RestaurantOrder";
import { backendURL } from "../../config";
// Orders page for restaurants
class RestaurantOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: cookie.load("user"),
      Orders: [],
      dispOrders: [],
      term: "delivery",
      term2: "pickup",
    };

    this.handleupsearch = this.handleupsearch.bind(this);
    this.handleupsearch2 = this.handleupsearch2.bind(this);
    this.updateterm = this.updateterm.bind(this);
    this.updateterm2 = this.updateterm2.bind(this);
  }
  componentDidMount() {
    console.log(this.state.user);
    const data = {
      restaurant: this.state.restaurant,
    };
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .post(backendURL+"/restaurant/orders", data)

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

  handleupsearch = (e) => {
    var output = this.state.Orders.filter(
      (order) => order.OrderType === this.state.term
    );
    this.setState({
      dispOrders: output,
    });
  };
  handleupsearch2 = (e) => {
    var output = this.state.Orders.filter(
      (order) => order.OrderStatus === this.state.term2
    );
    console.log(this.state.term2);
    console.log(output);
    this.setState({
      dispOrders: output,
    });
  };

  render() {
    let eventsdisp = null;
    eventsdisp = this.state.dispOrders[1].map((eve) => {
      console.log(eve.RestaurantEmail);
      return (
        <React.Fragment>
          <Card>
            <Card.Title>Customer: {eve.restaurantName}</Card.Title>
            <Card.Body>
              <a>Order Status: {eve.OrderStatus}</a>
              <br />
              <a>Order Time: {eve.OrderDateTime}</a>
            </Card.Body>

            <ROrder orderinfo={eve} />
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
                <option value="delivery">delivery</option>
                <option value="pickup">pickup</option>
              </Form.Control>
              <Button onClick={this.handleupsearch} variant="outline-success">
                Search
              </Button>
            </Form>
          </Col>
          <Col>
            <Form inline>
              <Form.Label>Order Status</Form.Label>
              <Form.Control as="select" required onChange={this.updateterm2}>
                <option value="Order Received">New Orders</option>
                <option value="pickup">Delivered</option>
                <option value="pickup">Cancelled</option>
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
export default RestaurantOrder;
