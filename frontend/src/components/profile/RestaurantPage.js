import React, { Component } from "react";

import {
  Container,
  Card,
  Row,
  Col,
  Jumbotron,
  ListGroup,
  ListGroupItem,
  Tab,
  Nav,
} from "react-bootstrap";
import cookie from "react-cookies";

import axios from "axios";
import Reviews from "../restaurantsearchtab/reviews";

import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import RatingReview from "../restaurantsearchtab/ratingForm";
import Menu from "../restaurant/menu";
import Navbar2 from "../navbar/UserNavbar";
import { backendURL } from "../../config";
class RestaurantPage extends Component {
  constructor(props) {
    console.log(props.match.params);
    super(props);
    this.state = {
      customer: cookie.load("user"),
      Restaurant: props.location.state.foo,
      restinfo: [],
      loaded: false,
    };
  }
  componentDidMount() {
    const data = {
      restaurantID: this.state.Restaurant,
    };
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .get(backendURL + "/customer/restaurantProfile", {
        params: {
          restaurantID: this.state.Restaurant,
        },
        withCredentials: true,
      })
      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          restinfo: response.data,
          loaded: true,
        });
      });
  }
  render() {

    var display = null;
    if (this.state.loaded) {
      display = (
        <>
          <Navbar2></Navbar2>
          <Container>
            <Jumbotron fluid>
              <Container>
                <Row>
                  <Col md={9}>
                    <Card>
                      <Card.Title>
                        {this.state.restinfo.Name}
                      </Card.Title>
                      <a>{this.state.restinfo.Cusine}</a>
                      <a>{this.state.restinfo.Description}</a>
                      <a>{this.state.restinfo.Location}</a>
                      <a>{this.state.restinfo.Hours}</a>

                      <ListGroup className="list-group-flush">
                        <ListGroupItem>
                          Phone Number:{" "}
                          {this.state.restinfo.PhoneNo}
                        </ListGroupItem>
                        <ListGroupItem>
                          Email: {this.state.restinfo.ContactEmail}
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
                      <Reviews restaurant={this.state.restinfo}></Reviews>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <RatingReview restaurantemail={this.state.restinfo} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <Menu rest={this.state.restinfo} />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Container>
        </>
      );
    }
    return (
      <>
        {display}
      </>
    );
  }
}
export default RestaurantPage;
