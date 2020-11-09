import React, { Component } from "react";
import "../../App.css";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Form,
  Pagination,
} from "react-bootstrap";
import cookie from "react-cookies";
import axios from "axios";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import Order from "./order";
import { backendURL } from "../../config";
import { connect } from "react-redux";
import { profile } from "../../Redux/constants/actiontypes";
// Orders page for users
class UserOrders extends Component {
  constructor(ownprops) {
    super(ownprops);
    this.state = {
      user: ownprops.userInfo,
      Orders: [],
      dispOrders: [],
      Sorted: false,
      Filtered: false,
      PageNo: 0,
      Pages: 0,
      OrderStatus: " Order Received",
    };
    this.updateterm2 = this.updateterm2.bind(this);
    this.handleupcoming = this.handleupcoming.bind(this);
    this.pageup = this.pageup.bind(this);
    this.pagedown = this.pagedown.bind(this);
  }
  componentDidMount() {
    console.log(this.state.user);
    const data = {
      customerID: this.state.user.ID,
      OrderStatus: "",
      Sorted: this.state.Sorted,
      Filtered: this.state.Filtered,
      PageNo: this.state.PageNo,
      OrderStatus: this.state.OrderStatus,
    };
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .post(backendURL + "/customer/orders", data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          Orders: response.data,
          dispOrders: response.data,
          Pages: response.data[0],
        });
      });
  }
  pageup = () => {
    console.log(this.state.user);
    const data = {
      customerID: this.state.user.ID,
      OrderStatus: "",
      Sorted: this.state.Sorted,
      Filtered: this.state.Filtered,
      PageNo: this.state.PageNo + 1,
      OrderStatus: this.state.OrderStatus,
    };
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .post(backendURL + "/customer/orders", data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          Orders: response.data,
          dispOrders: response.data,
          Pages: response.data[0],
          PageNo: this.state.PageNo + 1,
        });
      });
  };
  pagedown = () => {
    console.log(this.state.user);
    const data = {
      customerID: this.state.user.ID,
      OrderStatus: "",
      Sorted: this.state.Sorted,
      Filtered: this.state.Filtered,
      PageNo: this.state.PageNo - 1,
      OrderStatus: this.state.OrderStatus,
    };
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .post(backendURL + "/customer/orders", data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          Orders: response.data,
          dispOrders: response.data,
          Pages: response.data[0],
          PageNo: this.state.PageNo - 1,
        });
      });
  };
  updateterm2 = (e) => {
    this.setState({
      term2: e.target.value,
    });
  };
  handleupcoming = (e) => {
    console.log(e);
    e.preventDefault();
    console.log(this.state.user);
    if (this.state.Sorted) {
      this.setState({
        Sorted: false,
        PageNo: 0,
      });
    } else {
      this.setState({
        Sorted: false,
        PageNo: 0,
      });
    }
    console.log(this.state.user);
    const data = {
      customerID: this.state.user.ID,
      OrderStatus: "",
      Sorted: this.state.Sorted,
      Filtered: this.state.Filtered,
      PageNo: 0,
      OrderStatus: this.state.OrderStatus,
    };
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .post(backendURL + "/customer/orders", data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          Orders: response.data,
          dispOrders: response.data,
          Pages: response.data[0],
        });
      });
  };

  render() {
    let eventsdisp = null;
    console.log(this.state.dispOrders[1]);
    if (this.state.dispOrders[1]) {
      eventsdisp = this.state.dispOrders[1].map((eve) => {
        return (
          <React.Fragment>
            <Card>
              <Card.Title>Restaurant Name: {eve.restaurantName}</Card.Title>
              <Card.Body>
                <a>Order Status: {eve.OrderStatus}</a>
                <br />
                <a>Order Time: {eve.OrderDateTime}</a>
              </Card.Body>

              <Order Orderinfo={eve} />
            </Card>
          </React.Fragment>
        );
      });
    }
    console.log(this.state.Pages);
    console.log(this.state.PageNo);
    let items = [];
    for (let number = 0; number <= this.state.Pages; number++) {
      items.push(<Pagination.Item key={number}>{number}</Pagination.Item>);
    }
    return (
      <Container>
        <h1>Orders</h1>
        <Row>
          <Col>
            <Form inline>
              <Button onClick={this.handleupcoming} variant="outline-success">
                Change Sort
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
        <Pagination>
          <Pagination.Prev onClick={this.pagedown} />
          <Pagination.Item disabled>
            {this.state.PageNo + "/" + this.state.Pages}
          </Pagination.Item>

          <Pagination.Next onClick={this.pageup} />
        </Pagination>
        {eventsdisp}
      </Container>
    );
  }
}
//export Home Component
const mapStateToProps = (state, ownprops) => {
  console.log(state.LoginReducer.userInfo);
  const userInfo = state.LoginReducer.userInfo;
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
export default connect(mapStateToProps, mapDispatchToProps)(UserOrders);
