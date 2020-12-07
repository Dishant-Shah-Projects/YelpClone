import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { Button, Container, Accordion, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { backendURL } from "../../config";
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
  componentDidUpdate(prevProps) {
    if (prevProps.Orderinfo !== this.props.Orderinfo) {
      this.setState({
        Orderinfo: this.props.Orderinfo,
      });
    }
  }

  render() {
    var Output = null;
    var total = 0;
    console.log(this.state);
    if (this.state.Orderinfo.Items.length !== 0) {
      Output = this.state.Orderinfo.Items.map((eve) => {
        total = total + eve.DishPrice;
        return (
          <React.Fragment>
            <tr>
              <td>{eve.DishName}</td>
              <td>{eve.DishQuantity}</td>
              <td>{eve.DishPrice}</td>
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
