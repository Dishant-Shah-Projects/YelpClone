import React, { Component } from "react";

import {
  Container,
  Card,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Image,
  Jumbotron,
  Nav,
  Tab,
} from "react-bootstrap";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar2 from "../navbar/UserNavbar";
import Navbar3 from "../navbar/RestaurantNavbar";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import download from "./download.png";
import { backendURL } from "../../config";
import Follow from "./followButton";
import { connect } from "react-redux";
import { profile } from "../../Redux/constants/actiontypes";
import MessageForm from "./messageForm";
class Userpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: props.location.state.foo,
      userinfo: [],
      userimage: null,
      findmein: "",
      thingsilove: "",
      yelpingsince: "",
      loaded: false,
      viewer:props.userInfo,
      minfo:props.profileInfo,
    };
  }
  componentDidMount() {
    const data = {
      customerID: this.state.customer,
    };
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .get(backendURL + "/customer/customerProfile", {
        params: {
          customerID: this.state.customer,
        },
        withCredentials: true,
      })
      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          userinfo: response.data,
          loaded: true,
        });
      });
  }
  render() {
    console.log(this.state.userinfo);
    var display = null;
    let follow=null;
    let messageinit1=null;
    let messageinit2=null;
    console.log(this.state.viewer);
    if(this.state.viewer.Role==='Customer'){
      follow=(<Follow ID={this.state.userinfo.customerID} name={this.state.userinfo.FirstName+" "+this.state.userinfo.LastName}></Follow>);
    }
    else{
      messageinit1=(
        <Nav.Item>
        <Nav.Link eventKey="second">Send Message</Nav.Link>
      </Nav.Item>
      );
      messageinit2=(
        <Tab.Pane eventKey="second">
          <MessageForm customer={this.state.userinfo}> </MessageForm>
      </Tab.Pane>

      );
    }

    if (this.state.loaded) {
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
                    <Card.Title>                      {this.state.userinfo.FirstName +
                        " " +
                        this.state.userinfo.LastName}</Card.Title>
                    <a>Nickname:{this.state.userinfo.Nickname}</a>
                    <a>Location:{this.state.userinfo.City}</a>
                    <a>
                      {this.state.userinfo.State}, {this.state.userinfo.Country}
                    </a>
                    {follow}
                    <ListGroup className="list-group-flush">
                      <ListGroupItem>
                        Phone Number:{this.state.userinfo.Password}
                      </ListGroupItem>
                      <ListGroupItem>
                        Email: {this.state.userinfo.Email}
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
                  {messageinit1}
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <h3 style={{ color: "red" }}>About me</h3>
                    <h4 style={{ color: "black" }}>Find Me in </h4>
                    <p>{this.state.userinfo.Findme}</p>
                    <h4 style={{ color: "black" }}>Things I Love </h4>
                    <p>{this.state.userinfo.ThingsILove}</p>
                    <h4 style={{ color: "black" }}>Yelping Since </h4>
                    <p>{this.state.userinfo.AboutMe}</p>
                  </Tab.Pane>
                  {messageinit2}
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
//export Home Component
const mapStateToProps = (state, ownprops) => {
  console.log(state.LoginReducer.userInfo);
  const userInfo = state.LoginReducer.userInfo;
  const profileInfo = state.profilereducer.profileinfo;
  return {
    userInfo: userInfo,
    profileInfo: profileInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    profile: (payload) => {
      dispatch({
        type: profile,
        payload,
      });
    },
  };
};

//export Login Component
export default connect(mapStateToProps, mapDispatchToProps)(Userpage);
