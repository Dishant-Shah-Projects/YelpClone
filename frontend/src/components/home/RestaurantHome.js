import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import {
  Container,
  Card,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Jumbotron,
  Tab,
  Nav,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Reviews from "../restaurantsearchtab/reviews";
import ProfileUpdate3 from "./restaurantabout";
import AddMenu from "./menuupload";
import RestaurantPickUpload from "./Restaurantpicadd";
import { backendURL } from "../../config";
import { profile } from "../../Redux/constants/actiontypes";
import { connect } from "react-redux";
class RestHome extends Component {
  constructor(ownprops) {
    super(ownprops);
    this.state = {
      user: this.props.userInfo,
      restinfo: "",
    };
  }
  componentDidMount() {
    console.log(this.state.user);
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .get(backendURL + "/restaurant/profile", {
        params: {
          restaurantID: this.state.user.ID,
        },
        withCredentials: true,
      })
      .then((response) => {
        //update the state with the response data
        console.log(response);
        console.log(response.status);
        this.setState({
          restinfo: response.data,
        });
      });
  }
  render() {
    //iterate over books to create a table row

    //if not logged in go to login page
    let redirectVar = null;
    if (!cookie.load("user")) {
      console.log(cookie.load("user"));
      return (redirectVar = <Redirect to="/userlogin" />);
    }
    console.log(cookie.load("user"));

    return (
      <React.Fragment>
        <div>{redirectVar}</div>
        <Container>
          <Jumbotron fluid>
            <Container>
              <Row>
                <Col md={9}>
                  <Card>
                    <Card.Title>
                      {" "}
                      {this.state.restinfo.RestaurantName}
                    </Card.Title>
                    <a> {this.state.restinfo.RestaurantCusine}</a>
                    <a> {this.state.restinfo.RestaurantDescription}</a>
                    <a>{this.state.restinfo.RestaurantLocation}</a>
                    <a>Hours: {this.state.restinfo.RestaurantHours}</a>

                    <ListGroup className="list-group-flush">
                      <ListGroupItem>
                        Phone Number:{" "}
                        {this.state.restinfo.RestaurantPublicPhone}
                      </ListGroupItem>
                      <ListGroupItem>
                        Email: {this.state.restinfo.RestaurantPublicEmail}
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
                    <Nav.Link eventKey="second">Update Info</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third">Add Menu item</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="fourth">Add Menu item</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <Reviews restaurant={this.state.restaurant}></Reviews>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <RestaurantPickUpload></RestaurantPickUpload>
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <ProfileUpdate3></ProfileUpdate3>
                  </Tab.Pane>
                  <Tab.Pane eventKey="fourth">
                    <AddMenu></AddMenu>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </React.Fragment>
    );
  }
}

//export Home Component
const mapStateToProps = (state, ownprops) => {
  console.log(state.LoginReducer.userInfo);
  const userInfo = state.LoginReducer.userInfo;
  return {
    userInfo: userInfo,
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
export default connect(mapStateToProps, mapDispatchToProps)(RestHome);
