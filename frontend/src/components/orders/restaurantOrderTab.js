import React, { Component } from "react";
import "../../App.css";
import { Container, Card, Row, Col, Button, Form,Pagination } from "react-bootstrap";
import cookie from "react-cookies";
import axios from "axios";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import ROrder from "./RestaurantOrder";
import { backendURL } from "../../config";
import { connect } from "react-redux";
import { order } from "../../Redux/constants/actiontypes";
// Orders page for restaurants
class RestaurantOrder extends Component {
  constructor(ownprops) {
    super(ownprops);
    this.state = {
      restaurant: ownprops.userInfo,
      Orders: [],
      dispOrders: ownprops.orderinfo.orders,
      term: "delivery",
      term2: "pickup",
      PageNo: 0,
      Pages: 0,
    };

    this.pageup = this.pageup.bind(this);
    this.pagedown = this.pagedown.bind(this);
    this.updateterm = this.updateterm.bind(this);
    this.updateterm2 = this.updateterm2.bind(this);
  }
  componentDidMount() {
    console.log(this.state.dispOrders);
    if(this.state.dispOrders.length===0){
    const data = {
      restaurantID: this.state.restaurant.ID,
      Filtered:false,
      PageNo:0,
    };
    console.log(data);
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .post(backendURL + "/restaurant/orders", data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          Orders: response.data,
          dispOrders: response.data,
        });
        let info={orders:response.data, PageNo:this.state.PageNo, Pages: this.state.Pages};
        this.props.orders(info);
      });
    }
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
  pageup=()=> {
    const data = {
      restaurantID: this.state.restaurant.ID,
      Filtered:false,
      PageNo:this.state.PageNo+1,
    };
    console.log(data);
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .post(backendURL + "/restaurant/orders", data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          Orders: response.data,
          dispOrders: response.data,
          Pages: response.data[0],
          PageNo:this.state.PageNo+1,
        });
        let info={orders:response.data, PageNo:this.state.PageNo, Pages: this.state.Pages};
        this.props.orders(info);
      });
  }
  pagedown=()=> {
    const data = {
      restaurantID: this.state.restaurant.ID,
      Filtered:false,
      PageNo:this.state.PageNo-1,
    };
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .post(backendURL + "/restaurant/orders", data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          Orders: response.data,
          dispOrders: response.data,
          Pages: response.data[0],
          PageNo:this.state.PageNo-1,
        });
        let info={orders:response.data, PageNo:this.state.PageNo, Pages: this.state.Pages};
        this.props.orders(info);
      });
  }

  render() {
    let eventsdisp = null;
    try{

    
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
  }
  catch{
    eventsdisp=(<h1>loading orders</h1>)
  }
    return (
      <Container>
        <h1>Orders</h1>
        <Row>
          <Col>
            <Form inline>
              <Form.Label>Order Status</Form.Label>
              <Form.Control as="select" required onChange={this.updateterm2}>
                <option value="Order Received">New Orders</option>
                <option value="Delivered">Delivered</option>
                <option value="pickup">Cancelled</option>
              </Form.Control>
              <Button onClick={this.handleupsearch2} variant="outline-success">
                Search
              </Button>
            </Form>
          </Col>
        </Row>
        <Pagination>
        <Pagination.Prev onClick={this.pagedown} />
        <Pagination.Item disabled>{this.state.PageNo+"/"+this.state.Pages}</Pagination.Item>

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
  const orderinfo=state.orderReducer.orderinfo;
  if(orderinfo.PageNo===-1 ){
    orderinfo.PageNo=0;
    orderinfo.Pages=0;
  }
  return {
    userInfo: userInfo,
    orderinfo:orderinfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    orders: (payload) => {
      dispatch({
        type: order,
        payload,
      });
    },
  };
};

//export Login Component
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantOrder);
