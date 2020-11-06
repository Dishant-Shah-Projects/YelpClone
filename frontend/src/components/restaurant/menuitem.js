import React, { Component } from "react";

import { Button, Form, Card, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class Menuitem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iteminfo: props.iteminfo,
      quantity: 0,
      cost: props.iteminfo.ItemCost,
      total: 0,
    };
    this.quantityChangeHandler = this.quantityChangeHandler.bind(this);
  }

  quantityChangeHandler = (e) => {
    this.setState({
      quantity: e.target.value,
      total: e.target.value * this.state.cost,
    });
  };
  addtocart = (e) => {
    this.props.action([
      this.state.iteminfo.ItemName,
      this.state.quantity,
      this.state.total,
    ]);
  };
  render() {
    return (
      <>
        <Card>
          <Form>
            <Row>
              <Col>
                <a>{this.state.iteminfo.ItemName}</a>
              </Col>
              <Col>
                <input
                  onChange={this.quantityChangeHandler}
                  type="number"
                  className="form-control"
                  name="quantity"
                  placeholder="Amount"
                  required
                />
              </Col>
              <Col>
                <Button onClick={this.addtocart}>Add to cart</Button>
              </Col>
            </Row>
            <Row>
              <a>{this.state.iteminfo.ItemDesc}</a>{" "}
            </Row>
            <Row>
              <a>{this.state.iteminfo.Cat}</a>
            </Row>
            <a>{this.state.iteminfo.MainIngredients}</a>
          </Form>
        </Card>
      </>
    );
  }
}
export default Menuitem;
