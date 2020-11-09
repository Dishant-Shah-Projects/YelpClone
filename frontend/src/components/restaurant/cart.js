import React, { Component } from "react";
import { Container, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class Cart extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      Cart: props.cart,

      total: 0,
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.cart !== this.props.cart) {
      this.setState({
        Cart: this.props.cart,
      });
    }
  }

  render() {
    console.log(this.state.Cart);
    var Output = null;
    var Total = 0;
    Output = this.state.Cart.map((eve) => {
      Total = Total + eve[2];
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

    return (
      <Container>
        <h1>Items in Cart</h1>
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
              <th>{Total}</th>
            </tr>
          </tbody>
        </Table>
      </Container>
    );
  }
}
export default Cart;
