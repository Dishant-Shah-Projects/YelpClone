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
// Order component for User
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Orderinfo: props.Orderinfo,
      Orderitems: null,
    };
    console.log(this.state);
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

  render() {
    var Output = null;
    console.log(this.state.Orderitems);
    var total = 0;
    if (this.state.Orderitems) {
      console.log(this.state.Orderitems);
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

    return (
      <Container>
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
export default Order;
