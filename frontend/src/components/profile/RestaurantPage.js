import React, { Component } from "react";

import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Form,
  FormControl,
  Jumbotron,
  Image,
  ListGroup,
  ListGroupItem,
  Tab,
  Nav,
} from "react-bootstrap";
import cookie from "react-cookies";

import axios from "axios";
import Reviews from "../restaurantsearchtab/reviews";
import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import download from "./download.png";
import RatingReview from "../restaurantsearchtab/ratingreview";
import Menu from "../restaurant/menu";
class RestaurantPage extends Component {
  constructor(props) {
    console.log(props.match.params);
    super(props);
    this.state = {
      customer: cookie.load("user"),
      Restaurant: props.location.state.foo,
      Restinfo: [],
      loaded: false,
    };
  }
  componentDidMount() {
    const data = {
      Restaurant: this.state.Restaurant,
    };
    axios
      .post("http://localhost:3001/restaurant", data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          Restinfo: response.data,
          loaded: true,
        });
      });
  }
  render() {
    console.log(this.state.Restinfo);
    var outlook = this.state.Restinfo[0];
    console.log(outlook);
    var display = null;
    if (this.state.loaded) {
      console.log(this.state.Restinfo[0].RestaurantCusine);
      display = (
        <Container>
          <Jumbotron fluid>
            <Container>
              <Row>
                <Col md={9}>
                  <Card>
                    <Card.Title>
                      {this.state.Restinfo[0].RestaurantName}
                    </Card.Title>
                    <a>{this.state.Restinfo[0].RestaurantCusine}</a>
                    <a>{this.state.Restinfo[0].RestaurantDescription}</a>
                    <a>{this.state.Restinfo[0].RestaurantLocation}</a>
                    <a>{this.state.Restinfo[0].RestaurantHours}</a>

                    <ListGroup className="list-group-flush">
                      <ListGroupItem>
                        Phone Number:{" "}
                        {this.state.Restinfo[0].RestaurantPublicPhone}
                      </ListGroupItem>
                      <ListGroupItem>
                        Email: {this.state.Restinfo[0].RestaurantPublicEmail}
                      </ListGroupItem>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Jumbotron>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="first">Reviews</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Add Review</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third">Menu and Order Food</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <Reviews restaurant={this.state.Restaurant}></Reviews>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <RatingReview restaurantemail={this.state.Restaurant} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <Menu rest={this.state.Restaurant} />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      );
    }
    console.log(outlook);
    return (
      <>
        {display}
        <Menu rest={this.state.Restaurant} />
      </>
    );
  }
}
export default RestaurantPage;
