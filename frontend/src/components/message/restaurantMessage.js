import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { Redirect } from "react-router";
import Navbar2 from "../navbar/UserNavbar";
import Navbar3 from "../navbar/RestaurantNavbar";
import { connect } from "react-redux";
import { login,messageload } from "../../Redux/constants/actiontypes";
import axios from "axios";
import { backendURL } from "../../config";
import Conversation2 from "./conversation2";
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
class RestaurantMessage extends Component {
  constructor(oweprops) {
    super(oweprops);
    this.state = {
      UserEmail: oweprops.userInfo.ID,
      name: oweprops.name,
      Registered: false,
      messagedata: oweprops.conversations,
      loaded: false,
    };
    console.log("Apple");
  }
  componentDidMount() {
    if(this.state.messagedata.length===0){
    const data = {
      restaurantID: this.state.UserEmail,
    };
    console.log(data);
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .post(backendURL + "/restaurant/messageLoad", data)
      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          restaurants: response.data,
          loaded: true,
          messagedata: response.data,
        });
        this.props.messageload(response.data);
      });
    }
  }

  render() {
    let eventsdisp = null;
    let eventsdisp2 = null;

   try{
      eventsdisp = this.state.messagedata.map((eve) => {
        console.log(eve);
        return (
          <React.Fragment>
            <Nav.Item>
              <Nav.Link eventKey={eve.customerID}>{eve.customerName}</Nav.Link>
            </Nav.Item>
          </React.Fragment>
        );
      });
      eventsdisp2 = this.state.messagedata.map((eve) => {
        console.log(eve);
        return (
          <React.Fragment>
            <Tab.Pane eventKey={eve.customerID}>
              <Conversation2 messages={eve} />
            </Tab.Pane>
          </React.Fragment>
        );
      });
    }
    catch{
      console.log("error");
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
                <Tab.Content>{eventsdisp2}</Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state, oweprops) => {
  const userInfo = state.LoginReducer.userInfo;
  const conversations = state.messageReducer.conversations;
  return {
    userInfo: userInfo,
    conversations:conversations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    messageload: (payload) => {
      dispatch({
        type: messageload,
        payload,
      });
    },
  };
};

//export Login Component
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantMessage);
