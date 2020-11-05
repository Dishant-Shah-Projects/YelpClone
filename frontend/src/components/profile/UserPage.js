import React, { Component, useReducer } from "react";

import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Form,
  FormControl,
  ListGroup,
  ListGroupItem,
  Image,
  Jumbotron,
  Nav,
  Tab,
} from "react-bootstrap";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";

import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import download from "./download.png";

class Userpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: props.location.state.foo,
      Restaurant: cookie.load("user"),
      userinfo: [],
      userimage: null,
      findmein: "",
      thingsilove: "",
      yelpingsince: "",
      loaded: false,
    };
  }
  componentDidMount() {
    const data = {
      username: this.state.customer,
    };
    axios
      .post("http://localhost:3001/customerprofile", data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          userinfo: response.data,
          loaded: true,
        });
      });
    axios
      .post("http://localhost:3001/profilepic", data)

      .then((response) => {
        //update the state with the response data

        if (response.data) {
          this.setState({
            userimage:
              "http://localhost:3001/images/" + response.data[0].profilepicture,
          });
        } else {
          this.setState({
            userimage: download,
          });
        }
      });
    const data2 = {
      userEmail: this.state.customer,
    };
    console.log(data2);
    axios.post("http://localhost:3001/about", data2).then((response) => {
      console.log("Status Code : ", response.status);
      console.log(response.data);
      if (response.status === 200) {
        console.log(response.data);
        this.setState({
          findmein: response.data.findmein,
          thingsilove: response.data.thingsilove,
          yelpingsince: response.data.yelpingsince,
        });
      } else {
        this.setState({
          err: "Error with inputting information",
        });
      }
    });
  }
  render() {
    console.log(this.state.userinfo);
    var outlook = this.state.userinfo[0];
    var display = null;
    if (this.state.loaded) {
      console.log(outlook);
      display = (
        <Container>
          <Jumbotron fluid>
            <Container>
              <Row>
                <Col md={3}>
                  <Image
                    src={this.state.userimage}
                    style={{ width: 150, height: 150 }}
                  />
                </Col>
                <Col md={9}>
                  <Card>
                    <Card.Title>{this.state.userinfo.User_name}</Card.Title>
                    <a>Nickname:{this.state.userinfo.nickname}</a>
                    <a>Location:{this.state.userinfo.city}</a>
                    <a>
                      {this.state.userinfo.state}, {this.state.userinfo.country}
                    </a>
                    <Link
                      to={{
                        pathname: "/menu",
                        state: { foo: "test@test.com2" },
                      }}
                    >
                      My route3
                    </Link>

                    <ListGroup className="list-group-flush">
                      <ListGroupItem>
                        Phone Number: {this.state.userinfo.Conphone}
                      </ListGroupItem>
                      <ListGroupItem>
                        Email: {this.state.userinfo.Conemail}
                      </ListGroupItem>
                    </ListGroup>
                    <a style={{ fontStyle: "italic" }}>
                      "{this.state.userinfo.Headline}"
                    </a>
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
                    <Nav.Link eventKey="first">About</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <h3 style={{ color: "red" }}>About me</h3>
                    <h4 style={{ color: "black" }}>Find Me in </h4>
                    <p>{this.state.findmein}</p>
                    <h4 style={{ color: "black" }}>Things I Love </h4>
                    <p>{this.state.thingsilove}</p>
                    <h4 style={{ color: "black" }}>Yelping Since </h4>
                    <p>{this.state.yelpingsince}</p>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      );
    }

    return <>{display}</>;
  }
}
export default Userpage;
