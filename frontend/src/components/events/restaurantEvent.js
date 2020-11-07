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
  constructor(ownprops) {
    super(ownprops);
    this.state = {
      user: ownprops.userInfo,
      dispEvents: [],
      Pages:0,
    };
    console.log(ownprops.userInfo);
  }
  componentDidMount() {
    console.log(this.state.user);
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .get(backendURL+"/restaurant/events", {
        params: {
          restaurantID: this.state.user.ID,
          PageNo:0,
        },
        withCredentials: true,
      })
      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          dispEvents: response.data[1],
          Pages:response.data[0],
        });
      });
  }
  // paginate = (e) => {
  //   axios.defaults.headers.common["authorization"] = localStorage.getItem(
  //     "token"
  //   );
  //   axios
  //     .get(backendURL+"/restaurant/events", {
  //       params: {
  //         restaurantID: this.state.user.ID,
  //         PageNo:0,
  //       },
  //       withCredentials: true,
  //     })
  //     .then((response) => {
  //       //update the state with the response data
  //       console.log(response.data);
  //       this.setState({
  //         Events: response.data,
  //         dispEvents: response.data,
  //         Pages:response.data[0],
  //       });
  //     });

  // }

  render() {
    let eventsdisp = null;
    if(this.state.Pages){
      console.log(this.state.dispEvents);
    eventsdisp = this.state.dispEvents.map((eve) => {
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
              event={eve.PeopleRegistered}
            />
          </Card>
        </React.Fragment>
      );
    });}

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