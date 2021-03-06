import React, { Component } from "react";
import axios from "axios";
import { profile } from "../../Redux/constants/actiontypes";
import download from "./download.png";
import { backendURL } from "../../config";
import { Link } from "react-router-dom";
import {
  Container,
  Card,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Jumbotron,
  Image,
  Nav,
  Tab,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfileUpdate from "./aboutUpdate";
import ProfilePicUpload from "./profilepicupload";
import ProfileUpdate2 from "./ProfileUpdate";
import { connect } from "react-redux";
class CustomerHome extends Component {
  constructor(ownprops) {
    super(ownprops);
    console.log(ownprops);
    this.state = {
      user: ownprops.userInfo,
      userinfo: "",
      userimage: download,
    };
  }
  componentDidMount() {
    console.log(backendURL + "/customer/profile");

    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );

    axios
      .get(backendURL + "/customer/profile", {
        params: {
          customerID: this.state.user.ID,
        },
        withCredentials: true,
      })
      .then((response) => {
        //update the state with the response data
        console.log(response);
        console.log(response.status);
        let userInfo = response.data;
        this.props.profile(userInfo);
        this.setState({
          userinfo: response.data,
        });
      });
  }
  render() {
    let img = null;
    if (this.state.userinfo.ProfilePicURL) {
      console.log(backendURL + "/images/" + this.state.userinfo.ProfilePicURL);
      img = (
        <Image
          src={backendURL + "/images/" + this.state.userinfo.ProfilePicURL}
          style={{ width: 150, height: 150 }}
        />
      );
    }
    return (
      <React.Fragment>
        <Container>
          <Jumbotron fluid>
            <Container>
              <Row>
                <Col md={3}>{img}</Col>
                <Col md={9}>
                  <Card>
                    <Card.Title>
                      {this.state.userinfo.FirstName +
                        " " +
                        this.state.userinfo.LastName}
                    </Card.Title>
                    <a>Nickname:{this.state.userinfo.Nickname}</a>
                    <a>Location:{this.state.userinfo.City}</a>
                    <a>
                      {this.state.userinfo.State}, {this.state.userinfo.Country}
                    </a>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem>
                        Phone Number: {this.state.userinfo.PhoneNo}
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
                    <h3>Find Me in : {this.state.userinfo.Findme}</h3>
                    <h3>Things I Love : {this.state.userinfo.ThingsILove}</h3>
                    <h3>Yelping Since : {this.state.userinfo.AboutMe}</h3>
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
export default connect(mapStateToProps, mapDispatchToProps)(CustomerHome);
