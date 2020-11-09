import React, { Component } from "react";
import cookie from "react-cookies";
import {
  Button,
  Form,
  Container,
  FormGroup,
  Pagination,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Menuitem from "./menuItem.js";
import Cart from "./cart.js";
import { backendURL } from "../../config";
import { connect } from "react-redux";
import { profile } from "../../Redux/constants/actiontypes";
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Restaurant: props.rest,
      Restmenu: [],
      Cart: [],
      OrderType: "Delivery",
      useremail: props.userInfo,
      OrderSubmitted: false,
      PageNo: 0,
      Pages: 0,
    };
    this.addtocarr = this.addtocarr.bind(this);
    this.submitorder = this.submitorder.bind(this);
    this.pageup = this.pageup.bind(this);
    this.pagedown = this.pagedown.bind(this);
    this.DeliveryTypeChange = this.DeliveryTypeChange.bind(this);
  }
  componentDidMount() {
    const data = {
      restaurantID: this.state.Restaurant.restaurantID,
      PageNo: 0,
    };
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .post(backendURL + "/customer/restaurantMenu", data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          Restmenu: response.data[1],
          Pages: response.data[0],
        });
      });
  }
  pageup = () => {
    const data = {
      restaurantID: this.state.Restaurant.restaurantID,
      PageNo: this.state.PageNo + 1,
    };
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .post(backendURL + "/customer/restaurantMenu", data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          Restmenu: response.data[1],
          Pages: response.data[0],
          PageNo: this.state.PageNo + 1,
        });
      });
  };
  pagedown = () => {
    const data = {
      restaurantID: this.state.Restaurant.restaurantID,
      PageNo: this.state.PageNo - 1,
    };
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .post(backendURL + "/customer/restaurantMenu", data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          Restmenu: response.data[1],
          Pages: response.data[0],
          PageNo: this.state.PageNo - 1,
        });
      });
  };
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
      restaurantID: this.state.Restaurant.restaurantID,
      restaurantName: this.state.Restaurant.Name,
      customerID: this.state.useremail.customerID,
      customerName:
        this.state.useremail.FirstName + " " + this.state.useremail.LastName,
      Items: this.state.Cart,
      OrderType: this.state.OrderType,
    };
    console.log(data);
    axios
      .post(backendURL + "/customer/restaurantaddOrder", data)

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
    let menus = null;

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

        <Pagination>
          <Pagination.Prev onClick={this.pagedown} />
          <Pagination.Item disabled>
            {this.state.PageNo + "/" + this.state.Pages}
          </Pagination.Item>

          <Pagination.Next onClick={this.pageup} />
        </Pagination>
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
const mapStateToProps = (state, ownprops) => {
  console.log(state.LoginReducer.userInfo);
  const userInfo = state.profilereducer.profileinfo;
  return {
    userInfo: userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    profile: (payload) => {
      dispatch({
        type: profile,
        payload,
      });
    },
  };
};

//export Login Component
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
