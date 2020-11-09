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
import MenuPage from "./menuPage"
class RestHome extends Component {
  constructor(ownprops) {
    super(ownprops);
    this.state = {
      user: ownprops.userInfo,
      restinfo: ownprops.restInfo,
    };
  }
  componentDidMount() {
    console.log(this.state.restinfo);
    if(Object.keys(this.state.restinfo).length === 0){
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
        this.props.profile(response.data);
        this.setState({
          restinfo: response.data,
        });
      });
    }
  }
  render() {
    return (
      <React.Fragment>
        <div></div>
        <Container>
          <Jumbotron fluid>
            <Container>
              <Row>
                <Col md={9}>
                  <Card>
                    <Card.Title> {this.state.restinfo.Name}</Card.Title>
                    <a> {this.state.restinfo.Cusine}</a>
                    <a> {this.state.restinfo.Description}</a>
                    <a>{this.state.restinfo.Location}</a>
                    <a>Hours: {this.state.restinfo.Hours}</a>

                    <ListGroup className="list-group-flush">
                      <ListGroupItem>
                        Phone Number: {this.state.restinfo.PhoneNo}
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
                    <Nav.Link eventKey="fifth">Menu</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Update Info</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third">profile Update</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="fourth">Add Menu item</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <Reviews restaurant={this.state.restinfo}></Reviews>
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
                  <Tab.Pane eventKey="fifth">
                    <MenuPage rest={this.state.restinfo}></MenuPage>
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
  const restInfo=state.profilereducer.profileinfo
  return {
    userInfo: userInfo,
    restInfo:restInfo,
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
