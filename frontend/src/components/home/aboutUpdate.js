import React, { Component } from "react";
import "../../App.css";
// import cookie from 'react-cookies';
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import { profileupdate } from "../../Redux/constants/actiontypes";
import { connect } from "react-redux";
import { backendURL } from "../../config";

class ProfileUpdate extends Component {
  constructor(ownprops) {
    super(ownprops);
    this.state = {
      findmein: "",
      thingsilove: "",
      yelpingsince: "",
      err: "",
      userEmail: localStorage.getItem("userId"),

      authFlag: false,
    };

    this.findmeinChangeHandler = this.findmeinChangeHandler.bind(this);
    this.thingsiloveChangeHandler = this.thingsiloveChangeHandler.bind(this);
    this.yelpingsinceChangeHandler = this.yelpingsinceChangeHandler.bind(this);

    this.submit = this.submit.bind(this);
  }
  componentWillMount() {
    this.setState({
      authFlag: false,
    });
  }

  findmeinChangeHandler = (e) => {
    this.setState({
      findmein: e.target.value,
    });
  };
  thingsiloveChangeHandler = (e) => {
    this.setState({
      thingsilove: e.target.value,
    });
  };
  yelpingsinceChangeHandler = (e) => {
    this.setState({
      yelpingsince: e.target.value,
    });
  };

  submit = (e) => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
      customerID: this.state.userEmail,
      AboutMe: this.state.yelpingsince,
      ThingsILove: this.state.thingsilove,
      Findme: this.state.findmein,
    };

    console.log(this.state);

    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios.post(backendURL + "/customer/profileAbout", data).then((response) => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        this.setState({
          authFlag: true,
        });
        let userInfo = data;
        this.props.profileupdate(userInfo);
      } else {
        this.setState({
          authFlag: false,
        });
      }
    });
  };

  render() {
    return (
      <>
        <br />
        <Form>
          <Form.Label>Update Information</Form.Label>

          <Form.Label>Yelping Since</Form.Label>
          <Form.Control
            type="text"
            placeholder="Yelping Since"
            onChange={this.yelpingsinceChangeHandler}
          />
          <Form.Label>Things I Love</Form.Label>
          <Form.Control
            type="text"
            placeholder="Things I Love"
            onChange={this.thingsiloveChangeHandler}
          />
          <Form.Label>Find Me In</Form.Label>
          <Form.Control
            type="text"
            placeholder="Find me in"
            onChange={this.findmeinChangeHandler}
          />
          <Button variant="primary" type="submit" onClick={this.submit}>
            Submit
          </Button>
        </Form>
      </>
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
    profileupdate: (payload) => {
      dispatch({
        type: profileupdate,
        payload,
      });
    },
  };
};

//export Login Component
export default connect(mapStateToProps, mapDispatchToProps)(ProfileUpdate);
