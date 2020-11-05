import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router";
import { profile } from '../../Redux/constants/actiontypes';
import download from "./download.png";
import {backendURL} from '../../config';
import {
  Container,
  Card,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  Jumbotron,
  Image,
  Nav,
  Tab,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfileUpdate from "./customeraboutupdate";
import ProfilePicUpload from "./profilepicupload";
import ProfileUpdate2 from "./ProfileUpdate";
import { connect } from 'react-redux';
import { login } from '../../Redux/constants/actiontypes';
class CustomerHome extends Component {
  constructor(ownprops) {
    super(ownprops);
    console.log(ownprops);
    this.state = {
      user: this.props.userInfo,
      userinfo: "",
      userimage: download,
      findmein: "",
      thingsilove: "",
      yelpingsince: "",
    };
  }
  componentDidMount() {
    console.log(backendURL + '/customer/profile');
    const data = {
      customerID: this.state.user.ID,
    };

    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .get(backendURL + '/customer/profile', {
        params: {
          customerID: this.state.user.ID,
        },
        withCredentials: true,
      })
      .then((response) => {
        //update the state with the response data
        console.log(response);
        console.log(response.status);
        this.setState({
          userinfo: response.data,
        });
      });
  }
  render() {
    //iterate over books to create a table row

    //if not logged in go to login page
    
    var _id = "test@test.com2";
    var _id2 = "test@test.com";
    return (
      <React.Fragment>
        
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
                  <Nav.Item>
                    <Nav.Link eventKey="second">Update Info</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third">Update About</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="fourth">
                      Upload Profile Picture
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <h1>About me</h1>
                    <h3>Find Me in : {this.state.findmein}</h3>
                    <h3>Things I Love : {this.state.thingsilove}</h3>
                    <h3>Yelping Since : {this.state.yelpingsince}</h3>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <ProfileUpdate2></ProfileUpdate2>
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <ProfileUpdate></ProfileUpdate>
                  </Tab.Pane>
                  <Tab.Pane eventKey="fourth">
                    <ProfilePicUpload />
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
const mapStateToProps = (state,ownprops) => {
  console.log(state.LoginReducer.userInfo);
  const  userInfo  = state.LoginReducer.userInfo;
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
export default connect(mapStateToProps, mapDispatchToProps)(CustomerHome);
