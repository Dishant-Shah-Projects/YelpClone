import React, { Component } from "react";
import "../../App.css";
import { Container, Card } from "react-bootstrap";
import cookie from "react-cookies";
import axios from "axios";
import Setups from "./eventSetup";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import { backendURL } from "../../config";
import Peopleevent from "./eventPeople";
import { connect } from "react-redux";
import { profile } from "../../Redux/constants/actiontypes";
class Restaurantevents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ownprops.userInfo,
      dispEvents: [],
      Pages:0,
    };
  }
  componentDidMount() {
    console.log(this.state.user);
    const data = {
      restaurantID: this.state.user.ID,
      PageNo:0,
    };
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .get(backendURL + "/restaurant/events", data)
      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          dispEvents: response.data[1],
          PageNo:response.data[0],
        });
      });
  }
  paginate = (e) => {
    const data = {
      restaurantID: this.state.user.ID,
      PageNo:0,
    };
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .post(backendURL+"/customer/events",data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          Events: response.data,
          dispEvents: response.data,
          Pages:response.data[0],
        });
      });

  }

  render() {
    console.log(this.state.Events);
    let eventsdisp = null;
    eventsdisp = this.state.dispEvents[1].map((eve) => {
      return (
        <React.Fragment>
          <Card>
            <Card.Title>{eve.EventName}</Card.Title>

            <a>{eve.Description}</a>

            <a>{eve.Location}</a>
            <a>{eve.Time}</a>
            <a>{eve.Date}</a>
            <a>{eve.Hashtags}</a>
            <Peopleevent
              UserEmail={cookie.load("user")}
              RestEmail={eve.RestaurantEmail}
              eventname={eve.EventName}
            />
          </Card>
        </React.Fragment>
      );
    });

    return (
      <Container>
        <h1>Events Page</h1>
        {eventsdisp}
        <h1>Events Page</h1>
        <Setups></Setups>
      </Container>
    );
  }
}
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
export default connect(mapStateToProps, mapDispatchToProps)(Restaurantevents);