import React, { Component } from "react";
import "../../App.css";

import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";
import {
  Form,
  Row,
  Col,
  Button,
  Container,
  Accordion,
  Table,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// Class component for each Order under Orders for Restaurant
class ROrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Orderinfo: props.orderinfo,
      Orderitems: [],
      Orderstate: props.orderinfo.OrderStatus,
    };

    console.log(this.state);
    this.updateterm = this.updateterm.bind(this);
    this.handleupdate = this.handleupdate.bind(this);
  }
  componentDidMount() {
    const data = {
      OrderNo: this.state.Orderinfo.OrderNo,
    };
    console.log(data);
    axios
      .post("http://localhost:3001/itemuserorders", data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        console.log("Status Code : ", response.status);

        this.setState({
          Orderitems: response.data,
        });
      });
  }

  updateterm = (e) => {
    this.setState({
      Orderstate: e.target.value,
    });
  };
  handleupdate = (e) => {
    const data2 = {
      OrderNo: this.state.Orderinfo.OrderNo,
      OrderStatus: this.state.Orderstate,
    };
    axios
      .post("http://localhost:3001/updateorderstatus", data2)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        console.log("Status Code : ", response.status);
      });
    const data = {
      OrderNo: this.state.Orderinfo.OrderNo,
    };
    console.log(data);
    axios
      .post("http://localhost:3001/itemuserorders", data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        console.log("Status Code : ", response.status);

        this.setState({
          Orderitems: response.data,
        });
      });
  };

  render() {
    var Output = null;
    console.log(this.state.Orderitems);
    console.log(this.state.Orderinfo.OrderNo);
    var total = 0;
    if (this.state.Orderitems) {
      Output = this.state.Orderitems.map((eve) => {
        total = total + eve.ItemCost;
        return (
          <React.Fragment>
            <tr>
              <td>{eve.ItemName}</td>
              <td>{eve.ItemAmt}</td>
              <td>{eve.ItemCost}</td>
            </tr>
          </React.Fragment>
        );
      });
    }
    let optionvalue = null;
    if (this.state.Orderinfo.OrderType === "delivery") {
      optionvalue = (
        <React.Fragment>
          <option value="Order Received">Recieved</option>
          <option value="Preparing">Preparing</option>
          <option value="On The Way">OnTheWay</option>
          <option value="Delivered">Delivered</option>
        </React.Fragment>
      );
    } else {
      optionvalue = (
        <React.Fragment>
          <option value="Order Received">Recieved</option>
          <option value="Preparing">Preparing</option>
          <option value="Pick Up ready">Ready for Pickup</option>
          <option value="Picked Up">Picked Up</option>
        </React.Fragment>
      );
    }

    return (
      <Container>
        <Form>
          <Form.Label>Order Type</Form.Label>
          <Form.Control as="select" required onChange={this.updateterm}>
            {optionvalue}
          </Form.Control>
          <Button onClick={this.handleupdate} variant="outline-success">
            Update Status
          </Button>
        </Form>
        <Accordion defaultActiveKey="1">
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            Order Details!
          </Accordion.Toggle>

          <Accordion.Collapse eventKey="0">
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Total</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {Output}
                <tr>
                  <th>Total</th>
                  <th></th>
                  <th>{total}</th>
                </tr>
              </tbody>
            </Table>
          </Accordion.Collapse>
        </Accordion>
      </Container>
    );
  }
}
export default ROrder;
