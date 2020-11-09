import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { Redirect } from "react-router";
import Navbar2 from "../navbar/UserNavbar";
import Navbar3 from "../navbar/RestaurantNavbar";
import { connect } from "react-redux";
import { login } from "../../Redux/constants/actiontypes";
import axios from "axios";
import { backendURL } from "../../config";
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
  Form,
} from "react-bootstrap";
class Conversation2 extends Component {
  constructor(oweprops) {
    super(oweprops);
    this.state = {
      messages: oweprops.messages,
      Registered: false,
      messagedata:"",
      Message:"",
    };
    console.log("Apple");
    this.messageChangeHandler = this.messageChangeHandler.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  messageChangeHandler = (e) => {
      console.log(e.target.value);
    this.setState({
        Message: e.target.value,
    });
  };
  handleClick = (e) => {
    const data = {
        restaurantID: this.state.messages.restaurantID,
        customerID: this.state.messages.customerID,
        Messager:"restaurant",
        Message:this.state.Message
    };
    console.log(data);
    axios
      .post(backendURL + "/restaurant/messageSend", data)

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
      return false;
  };

  render() {
    let reg = null;
    let eventsdisp = null;
    reg = (
      <Button onClick={this.handleClick} size="sm">
        Submit
      </Button>
    );

      eventsdisp = this.state.messages.Messages.map((eve) => {
        console.log(eve);
        if(eve.Messager==='restaurant'){
            return (
                <React.Fragment>
                     <ListGroup.Item>         <b>
           <span className="float-right">{eve.Message} : {this.state.messages.restaurantName}</span>
         </b></ListGroup.Item>
                </React.Fragment>
              );
        }
        else if(eve.Messager==='customer'){
            return (
                <React.Fragment>
                     <ListGroup.Item>         <b>
           <span className="float-left">{this.state.messages.customerName} : {eve.Message}</span>
         </b></ListGroup.Item>
                </React.Fragment>
              );
        }

      });

    
    return (
      <>
        <Container>
            <h1>{this.state.messages.restaurantName}</h1>
        <ListGroup>
            {eventsdisp}
            <ListGroup.Item>  
            <Form inline>
            <Form.Control type="text" placeholder="Enter message" onChange={this.messageChangeHandler}/>
                {reg}
            </Form>
            </ListGroup.Item> 
        </ListGroup>
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
export default connect(mapStateToProps, mapDispatchToProps)(Conversation2);
