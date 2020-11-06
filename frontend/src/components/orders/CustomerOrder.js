import React, { Component } from "react";
import "../../App.css";
import { Container, Card, Row, Col, Button, Form } from "react-bootstrap";
import cookie from "react-cookies";
import axios from "axios";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import Order from "./order";
import { backendURL } from "../../config";
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
    this.updateterm = this.updateterm.bind(this);
  }
  componentDidMount() {
    console.log(this.state.user);
    const data = {
      customerID: this.state.user,
      OrderStatus:"",
      Sorted:"",
      Filtered:"",
      PageNo:"",
    };
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .post(backendURL+"/customer/orders", data)

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

  updateterm = (e) => {
    this.setState({
      term: e.target.value,
    });
  };

  render() {
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
