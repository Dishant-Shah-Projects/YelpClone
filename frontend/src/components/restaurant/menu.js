import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import {
  Navbar,
  NavDropdown,
  Nav,
  FormControl,
  Button,
  Form,
  Container,
  Card,
  FormGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Menuitem from "./menuitem";
import Cart from "./cart.js";
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Restaurant: props.rest,
      Restmenu: [],
      Cart: [],
      OrderType: "Delivery",
      total: 0,
      useremail: cookie.load("user"),
      OrderSubmitted: false,
    };
    this.addtocarr = this.addtocarr.bind(this);
    this.submitorder = this.submitorder.bind(this);
    this.DeliveryTypeChange = this.DeliveryTypeChange.bind(this);
  }
  componentDidMount() {
    const data = {
      Restaurant: this.state.Restaurant,
    };
    axios
      .post("http://localhost:3001/menu", data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          Restmenu: response.data,
        });
      });
  }
  addtocarr = (e) => {
    var copy = [...this.state.Cart];
    console.log(e);
    copy.push(e);
    this.setState({
      Cart: copy,
    });
    console.log(this.state.Cart);
  };
  DeliveryTypeChange = (e) => {
    console.log(e.target.value);

    this.setState({
      OrderType: e.target.value,
    });
    console.log(this.state.OrderType);
  };
  submitorder = (event) => {
    event.preventDefault();
    console.log(this.state.OrderType);
    const data = {
      Restaurant: this.state.Restaurant,
      Cart: this.state.Cart,
      total: this.state.total,
      OrderType: this.state.OrderType,
      useremail: this.state.useremail,
    };
    axios
      .post("http://localhost:3001/addorder", data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          OrderSubmitted: true,
        });
      });
  };
  render() {
    console.log(this.state.Restmenu);
    let appitizers = null;
    appitizers = this.state.Restmenu.map((eve) => {
      return (
        <React.Fragment>
          <Menuitem action={this.addtocarr} iteminfo={eve}></Menuitem>
        </React.Fragment>
      );
    });
    if (this.state.OrderSubmitted) {
      return (
        <>
          <Container>
            <h1>Thank you for submitting your order!</h1>
            <h2>Please Check the Orders Page for details</h2>
          </Container>
        </>
      );
    }
    return (
      <Container>
        <h1> Menu</h1>
        {appitizers}

        <h1>Cart</h1>

        <Cart rest={this.state.Restaurant} cart={this.state.Cart}></Cart>
        <Form>
          <FormGroup>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Order Type</Form.Label>
              <Form.Control
                as="select"
                required
                onChange={this.DeliveryTypeChange}
              >
                <option value="Delivery">delivery</option>
                <option value="Pickup">pickup</option>
              </Form.Control>
            </Form.Group>
          </FormGroup>
          <FormGroup>
            <Button onClick={this.submitorder} type="submit" variant="primary">
              Submit Order
            </Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}
export default Menu;
