import React, { Component } from "react";

import { Button, Form, Card, Row, Col,Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { backendURL } from "../../config";
class Menuitems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iteminfo: props.iteminfo,
      quantity: 0,
      cost: props.iteminfo.DishPrice,
      total: 0,
    };
  }


  render() {
    return (
      <>
        <Card>
          <Form>
              <Col>
            <Row>
              <Col>
                <a>DishName:{this.state.iteminfo.DishName}</a>
              </Col>


            </Row>
            <Row>
              <a>Description:{this.state.iteminfo.Description}</a>{" "}
            </Row>
            <Row>
              <a>Category:{this.state.iteminfo.Category}</a>
            </Row>
            <a>Main Ingredients:{this.state.iteminfo.Mainingredients}</a>
            <br/>
            <a>Price: ${this.state.iteminfo.DishPrice}</a>
            </Col>
            <Col>
              <Image src={backendURL+"/images/"+this.state.iteminfo.DishIMG} style={{ width: 150, height: 150 }}></Image>
            </Col>
          </Form>
          
        </Card>
      </>
    );
  }
}
export default Menuitems;
