import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { Redirect } from "react-router";
import Navbar2 from "../navbar/UserNavbar";
import Navbar3 from "../navbar/RestaurantNavbar";
import { connect } from "react-redux";
import { login } from "../../Redux/constants/actiontypes";
import axios from "axios";
import { backendURL } from "../../config";
import Conversation from "./conversation"
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
  Button,
} from "react-bootstrap";
class CustomerMessage extends Component {
  constructor(oweprops) {
    super(oweprops);
    this.state = {
      UserEmail: oweprops.userInfo.ID,
      name: oweprops.name,
      Registered: false,
      messagedata:"",
      loaded:false,
    };
    console.log("Apple");
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    const data = {
      customerID: this.state.UserEmail,
    };
    console.log(data);
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios.post(backendURL + "/customer/messageLoad", data).then((response) => {
      //update the state with the response data
      console.log(response.data);
      this.setState({
        restaurants: response.data,
        loaded: true,
        messagedata:response.data,
      });
    });
  }

  handleClick = (e) => {
    e.preventDefaults();
    const data = {
      eventID: this.state.EventName.eventID,
      CustomerID: this.state.UserEmail.ID,
      CustomerName: this.state.name,
    };
    console.log(data);
    axios
      .post(backendURL + "/customer/eventsregister", data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            Registered: true,
          });
        } else {
          this.setState({
            Registered: false,
          });
        }
      });
  };

  render() {
    let reg = null;
    let eventsdisp = null;
    let eventsdisp2 = null;
    reg = (
      <Button onClick={this.handleClick} size="sm">
        Register
      </Button>
    );
    if(this.state.loaded){
      eventsdisp = this.state.messagedata.map((eve) => {
        console.log(eve);
        return (
          <React.Fragment>
                  <Nav.Item>
        <Nav.Link eventKey={eve.restaurantID}>{eve.restaurantName}</Nav.Link>
                  </Nav.Item>
          </React.Fragment>
        );
      });
      eventsdisp2 = this.state.messagedata.map((eve) => {
        console.log(eve);
        return (
          <React.Fragment>
                  <Tab.Pane eventKey={eve.restaurantID}>
                    <Conversation messages={eve}/>
                    </Tab.Pane>
          </React.Fragment>
        );
      });
    }
    return (
      <>
        <Container>
          <h1>Messages</h1>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  {eventsdisp}
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                {eventsdisp2}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state,oweprops) => {
  const userInfo = state.LoginReducer.userInfo;
  return {
    userInfo: userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (payload) => {
      dispatch({
        type: login,
        payload,
      });
    },
  };
};

//export Login Component
export default connect(mapStateToProps, mapDispatchToProps)(CustomerMessage);
